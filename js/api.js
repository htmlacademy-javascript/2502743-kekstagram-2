const API_URL = 'https://31.javascript.htmlacademy.pro/';
const Route = {
  GET_DATA: 'kekstagram/data',
  SEND_DATA:'kekstagram'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте ещё раз',
  SEND_DATA: 'Ошибка загрузки файла. Попробуйте ещё раз'
};

const loadPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      throw new Error(ErrorText.GET_DATA);
    }
    return await response.json();
  } catch (error) {
    throw new Error(ErrorText.GET_DATA);
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(`${API_URL}${Route.SEND_DATA}`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(ErrorText.SEND_DATA);
    }
    return await response.json();
  } catch (error) {
    throw new Error(ErrorText.SEND_DATA);
  }
};

export { loadPhotos, sendData };
