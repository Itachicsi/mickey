let x =[], y=[], z= [];
let u =[], e=[], f= [], g=[];
let fourierX, fourierY, fourierZ, fourierU, fourierE, fourierF, fourierG;
let path1 = [], path2 = [], path3 = [];
let path4 = [], path5 = [], path6 = [], path7 = [];

function getFourierArray(){
  const skip = 8;

  for (let j = 0; j < jaw.length; j += skip) {
    const c = new Complex(leftear[j].x, leftear[j].y);
    z.push(c);
  }
  fourierZ = dft(z);
  fourierZ.sort((a, b) => b.amp - a.amp); 

  //tao ham truyen tham chieu trong ham (ham trong ham dft(x)) tuong doi ao
  for (let i = 0; i < rightear.length; i += skip) {
    const c = new Complex(rightear[i].x, rightear[i].y);
    x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp); 

  for (let j = 0; j < jaw.length; j += skip) {
    const c = new Complex(jaw[j].x, jaw[j].y);
    y.push(c);
  }
  fourierY = dft(y);
  fourierY.sort((a, b) => b.amp - a.amp); 

  for (let j = 0; j < m_eye.length; j += skip) {
    const c = new Complex(m_eye[j].x, m_eye[j].y);
    u.push(c);
  }
  fourierU = dft(u);
  fourierU.sort((a, b) => b.amp - a.amp); 

  for (let j = 0; j < nose.length; j += skip) {
    const c = new Complex(nose[j].x, nose[j].y);
    e.push(c);
  }
  fourierE = dft(e);
  fourierE.sort((a, b) => b.amp - a.amp); 

  for (let j = 0; j < k_eye.length; j += skip) {
    const c = new Complex(k_eye[j].x, k_eye[j].y);
    f.push(c);
  }
  fourierF = dft(f);
  fourierF.sort((a, b) => b.amp - a.amp); 

  for (let j = 0; j < forehead.length; j += skip) {
    const c = new Complex(forehead[j].x, forehead[j].y);
    g.push(c);
  }
  fourierG = dft(g);
  fourierG.sort((a, b) => b.amp - a.amp); 
}
function getVertex(){
  

  let v1 = epicycles(width/2, height/2, fourierX, 1);
  path1.push(v1);

  let v2 = epicycles(width/2, height/2, fourierY, 1);
  path2.push(v2);

  let v3 = epicycles(width/2, height/2, fourierZ, 1);
  path3.push(v3);

  let v4 = epicycles(width/2, height/2, fourierU, 0);
  path4.push(v4);

  let v5 = epicycles(width/2, height/2, fourierE, 0);
  path5.push(v5);

  let v6 = epicycles(width/2, height/2, fourierF, 0);
  path6.push(v6);

  let v7 = epicycles(width/2, height/2, fourierG, 0);
  path7.push(v7);
}
