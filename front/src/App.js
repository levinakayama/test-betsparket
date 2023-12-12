import { useCallback, useEffect, useState } from 'react'

import './App.css'
import Api from './axios'
import InputMask from './InputMask'

function App() {
  const [solution,setSolution] = useState(true)
  const [error, setError] = useState('')

  const [heightX, setHeightX] = useState('0%')
  const [heightY, setHeightY] = useState('0%')
  const [heightZ, setHeightZ] = useState('0%')

  const [valueX, setValueX] = useState('0')
  const [valueY, setValueY] = useState('0')
  const [valueZ, setValueZ] = useState('0')

  const [finalX, setFinalX] = useState('0')
  const [finalY, setFinalY] = useState('0')

  const validate = async (e) => {
    e.preventDefault()

    /* let res =  */await Api.post('/validate', {
      valueX: parseInt(finalX),
      valueY: parseInt(finalY),
      valueZ: parseInt(valueZ),
    })
  }

  const biggerNumberXY = useCallback(() => {
    let n = 0
    if (parseInt(valueX) > n) {
      n = parseInt(valueX)
    }

    if (parseInt(valueY) > n) {
      n = parseInt(valueY)
    }

    return n
  }, [valueX, valueY])

  const fillX = () => {
    setError('')

    if (parseInt(finalX) > 0) {
      setError('Value of X already exists')
      return
    }

    if (valueX === '') {
      setError('Fill X required!')
      return
    }

    if (valueX === '0') {
      setError('Fill X value more then zero!')
      return
    }

    let bigger = biggerNumberXY()
    setHeightX(Math.floor((parseInt(valueX) / bigger) * 100).toString() + '%')
    setFinalX(parseInt(valueX))
  }

  const transferToY = () => {
    setError('')

    if (parseInt(finalX) <= 0) {
      setError('X is empty')
      return
    }

    let transf = parseInt(finalX);
    if (transf > parseInt(valueY)) {
      transf = parseInt(valueY);
    }

    let v = transf + parseInt(finalY)
    if (v > parseInt(valueY)) {
      setError('Y value does not accommodate this volume.')
      return
    }

    let bigger = biggerNumberXY()
    setHeightY(Math.floor((parseInt(v) / bigger) * 100).toString() + '%')
    setFinalY(v)

    let diff = finalX - v;
    if (diff < 0) {
      diff = 0;
    }
    setHeightX(Math.floor((parseInt(diff) / bigger) * 100).toString() + '%')
    setFinalX(diff)
  }

  const emptyX = () => {
    setError('')
    setHeightX('0%')
    setFinalX(0)
  }

  const fillY = () => {
    setError('')

    if (parseInt(finalY) > 0) {
      setError('Value of Y already exists')
      return
    }

    if (valueY === '') {
      setError('Fill X required!')
      return
    }

    if (valueY === '0') {
      setError('Fill X value more then zero!')
      return
    }

    let bigger = biggerNumberXY()
    setHeightY(Math.floor((parseInt(valueY) / bigger) * 100).toString() + '%')
    setFinalY(parseInt(valueY))
  }

  const transferToX = () => {
    if (parseInt(finalY) <= 0) {
      setError('Y is empty')
      return
    }

    let transf = parseInt(finalY);
    if (transf > parseInt(valueX)) {
      transf = parseInt(valueX);
    }

    let v = transf + parseInt(finalX)
    if (v > parseInt(valueX)) {
      setError('X value does not accommodate this volume.')
      return
    }

    let bigger = biggerNumberXY()
    setHeightX(Math.floor((parseInt(v) / bigger) * 100).toString() + '%')
    setFinalX(v)

    let diff = finalY - v;
    if (diff < 0) {
      diff = 0;
    }
    setHeightY(Math.floor((parseInt(diff) / bigger) * 100).toString() + '%')
    setFinalY(diff)
  }

  const emptyY = () => {
    setError('')
    setHeightY('0%')
    setFinalY(0)
  }

  const checkSolution = useCallback(() => {
    setError('')
    setSolution(true)
    let bigger = biggerNumberXY()
    let z = parseInt(valueZ)
    if ((bigger % 2) !== (z % 2)) {
      setSolution(false)
      setError('NO SOLUCION...')
      return
    }
  }, [setError, biggerNumberXY, valueZ, setSolution])

  useEffect(() => {
    setError('')
    let bigger = biggerNumberXY()
    if (parseInt(valueZ) > bigger) {
      setError('Z cannot be greater than X and Y')
      return
    }
    if (parseInt(valueX) <= 0) {
      setError('X must be greater than zero')
      return
    }
    if (parseInt(valueY) <= 0) {
      setError('Y must be greater than zero')
      return
    }
    setHeightZ(Math.floor((parseInt(valueZ) / bigger) * 100).toString() + '%')
    checkSolution()
  }, [valueX, valueY, valueZ, setHeightZ, biggerNumberXY, checkSolution])

  return (
    <div className='container'>
      <h1 className='text-center m-0 mt-5'>Water Jug Challenge</h1>
      {error ? <div className='alert alert-danger m-0 mt-5'>{error}</div> : ''}
      <form onSubmit={validate}>
        <div className='row mt-3'>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket X</label>
            <InputMask mask="num" value={valueX} onChange={v => setValueX(v)} onBlur={_ => emptyX()} placeholder='Value X' className='form-control' />
          </div>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket Y</label>
            <InputMask mask="num" value={valueY} onChange={v => setValueY(v)} onBlur={_ => emptyY()} placeholder='Value Y' className='form-control' />
          </div>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket Z</label>
            <InputMask mask="num" value={valueZ} onChange={v => setValueZ(v)} placeholder='Value Z' className='form-control' />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4 d-flex justify-content-center'>
            <div className='bucket d-flex align-items-end'>
              <div className='bucket-water bg-primary' style={{ height: heightX }}>
                <div className='bucket-final'>{finalX}</div>
              </div>
            </div>
          </div>
          <div className='col-md-4 d-flex justify-content-center'>
            <div className='bucket d-flex align-items-end'>
              <div className='bucket-water bg-primary' style={{ height: heightY }}>
                <div className='bucket-final'>{finalY}</div>
              </div>
            </div>
          </div>
          <div className='col-md-4 d-flex justify-content-center'>
            <div className='bucket d-flex align-items-end'>
              <div className='bucket-water bg-warning' style={{ height: heightZ }}></div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-4'>
            <button type='button' className='btn btn-outline-primary btn-block' onClick={_ => fillX()}>Fill</button>
            <button type='button' className='btn btn-outline-secondary btn-block' onClick={_ => transferToY()}>Transfer to Y</button>
            <button type='button' className='btn btn-outline-danger btn-block' onClick={_ => emptyX()}>Empty</button>
          </div>
          <div className='col-md-4'>
            <button type='button' className='btn btn-outline-primary btn-block' onClick={_ => fillY()}>Fill</button>
            <button type='button' className='btn btn-outline-secondary btn-block' onClick={_ => transferToX()}>Transfer to X</button>
            <button type='button' className='btn btn-outline-danger btn-block' onClick={_ => emptyY()}>Empty</button>
          </div>
        </div>
        <div className='row mt-4 pb-4'>
          <div className='col-md-12'>
            <button type='submit' className='btn btn-primary btn-lg btn-block' disabled={!solution}>Validate</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App