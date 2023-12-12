import { useCallback, useEffect, useState } from 'react'

import './App.css'
import Api from './axios'

function App() {

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
      return;
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
    let v = parseInt(finalX) + parseInt(finalY)
    if (v > parseInt(valueY)) {
      setError('Y value does not accommodate this volume.');
      return;
    }

    let bigger = biggerNumberXY()
    setHeightY(Math.floor((parseInt(v) / bigger) * 100).toString() + '%')
    setFinalY(v)

    setHeightX('0%')
    setFinalX(0)
  }

  const emptyX = () => {
    setError('')
    setHeightX('0%')
    setFinalX(0);
  }

  const fillY = () => {
    setError('')

    if (parseInt(finalY) > 0) {
      setError('Value of X already exists')
      return;
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

  }

  const emptyY = () => {
    setError('')
    setHeightY('0%')
    setFinalY(0);
  }

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
  }, [valueX, valueY, valueZ, setHeightZ, biggerNumberXY])

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Water Jug Challenge</h1>
      {error ? <div className='alert alert-danger'>{error}</div> : ''}
      <form onSubmit={validate}>
        <div className='row mt-5'>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket X</label>
            <input type='number' className='form-control' placeholder='Value X' value={valueX} onChange={e => setValueX(e.target.value)} />
          </div>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket Y</label>
            <input type='number' className='form-control' placeholder='Value Y' value={valueY} onChange={e => setValueY(e.target.value)} />
          </div>
          <div className='col-md-4 form-group'>
            <label className='d-block text-center'>Bucket Z</label>
            <input type='number' className='form-control' placeholder='Value Z' value={valueZ} onChange={e => setValueZ(e.target.value)} />
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
        <div className='row mt-4'>
          <div className='col-md-12'>
            <button type='submit' className='btn btn-primary btn-lg btn-block'>Validate</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App