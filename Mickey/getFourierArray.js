let data = [], skipData = [];
let fourierData = [], pathData = [];
let v = [];
//data skipData fourierData pathData

function getDataArray(){
  data.push(jaw);
  data.push(rightear);
  data.push(leftear);
  data.push(m_eye);
  data.push(k_eye);
  data.push(nose);
  data.push(forehead);
}

function getFourierArray(){
  const skip = 8;
  getDataArray();

  for (let i = 0; i < data.length; i++){ skipData[i]=[];
       for (let j = 0; j < data[i].length; j += skip) {
          const c = new Complex(data[i][j].x, data[i][j].y);
          skipData[i].push(c);
    }
  fourierData[i] = dft(skipData[i]);
  fourierData[i].sort((a, b) => b.amp - a.amp); 
  }
}

function getVertex(){
  for(let i = 0; i < data.length; i++){
  v[i] = epicycles(width/2, height/2, fourierData[i]);
  pathData[i].push(v[i]);
  }
}
