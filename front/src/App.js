import './App.css'

function App() {

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Water Jug Challenge</h1>
      <div className='row mt-5'>
        <div className='col-md-4 form-group'>
          <label className='d-block text-center'>Bucket X</label>
          <input type='number' className='form-control' placeholder='Value X' />
        </div>
        <div className='col-md-4 form-group'>
          <label className='d-block text-center'>Bucket Y</label>
          <input type='number' className='form-control' placeholder='Value Y' />
        </div>
        <div className='col-md-4 form-group'>
          <label className='d-block text-center'>Bucket Z</label>
          <input type='number' className='form-control' placeholder='Value Z' />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4 d-flex justify-content-center'>
          <div className='bucket'></div>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
          <div className='bucket'></div>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
          <div className='bucket'></div>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-12'>
          <button type='submit' className='btn btn-primary btn-lg btn-block'>Calculate</button>
        </div>
      </div>
    </div>
  );
}

export default App