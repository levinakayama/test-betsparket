import { useState } from 'react'

import './App.css'
import Api from './axios'

function App() {

  const [error, setError] = useState('')

  const [heightX, setHeightX] = useState('0%')
  const [heightY, setHeightY] = useState('0%')
  const [heightZ, setHeightZ] = useState('0%')

  const [valueX, setValueX] = useState('0');
  const [valueY, setValueY] = useState('0');
  const [valueZ, setValueZ] = useState('0');

  const validate = async (e) => {
    e.preventDefault()

    /* let res =  */await Api.post('/validate', {
      valueX: parseInt(valueX),
      valueY: parseInt(valueY),
      valueZ: parseInt(valueZ),
    })
  }

  const biggerNumberXY = () => {
    let n = 0;
    if (parseInt(valueX) > n) {
      n = parseInt(valueX)
    }

    if (parseInt(valueY) > n) {
      n = parseInt(valueY)
    }

    return n
  }

  const fillX = () => {
    setError('')

    if (valueX === '') {
      setError('Fill X required!')
      return;
    }

    if (valueX === '0') {
      setError('Fill X value more then zero!')
      return;
    }

    let bigger = biggerNumberXY()
    setHeightX(Math.floor((parseInt(valueX) / bigger) * 100).toString() + '%');
  }

  const emptyX = () => {
    setHeightX('0%');
  }

  const fillY = () => {
    setError('')

    if (valueY === '') {
      setError('Fill X required!')
      return;
    }

    if (valueY === '0') {
      setError('Fill X value more then zero!')
      return;
    }

    let bigger = biggerNumberXY()
    setHeightY(Math.floor((parseInt(valueY) / bigger) * 100).toString() + '%');
  }

  const emptyY = () => {
    setHeightY('0%');
  }

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
              <div className='bucket-water' style={{ height: heightX }}></div>
            </div>
          </div>
          <div className='col-md-4 d-flex justify-content-center'>
            <div className='bucket d-flex align-items-end'>
              <div className='bucket-water' style={{ height: heightY }}></div>
            </div>
          </div>
          <div className='col-md-4 d-flex justify-content-center'>
            <div className='bucket d-flex align-items-end'>
              <div className='bucket-water' style={{ height: heightZ }}></div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-4'>
            <button type='button' className='btn btn-outline-primary btn-block' onClick={_ => fillX()}>Fill</button>
            <button type='button' className='btn btn-outline-secondary btn-block'>Transfer Y</button>
            <button type='button' className='btn btn-outline-danger btn-block' onClick={_ => emptyX()}>Empty</button>
          </div>
          <div className='col-md-4'>
            <button type='button' className='btn btn-outline-primary btn-block' onClick={_ => fillY()}>Fill</button>
            <button type='button' className='btn btn-outline-secondary btn-block'>Transfer X</button>
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
  );
}

export default App