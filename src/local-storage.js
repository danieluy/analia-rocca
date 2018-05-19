import events from './events';

function getLocalData() {
  try {
    const data = JSON.parse(window.localStorage.getItem('AR_DATA'));
    return data;
  }
  catch (error) {
    console.error('ERROR loading local data.');
    return null;
  }
}

function setLocalData(data) {
  try {
    const newData = Object.assign(getLocalData() || {}, data);
    window.localStorage.setItem('AR_DATA', JSON.stringify(newData));
    events.emit('LOCAL_DATA_UPDATED');
  }
  catch (error) {
    console.error('ERROR saving local data.', error);
  }
}

export {
  getLocalData,
  setLocalData
};
