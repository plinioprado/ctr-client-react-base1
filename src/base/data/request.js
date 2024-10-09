import get_format from './format/get_format'


export default async function request(name, qString) {
    const url = `http://localhost:8000/ledger/${name}${qString}`
    const data = await doRequest(url, 'GET')
    data.format = await get_format(name)
    return data
}


const doRequest = async (url, method, body) => {
    try {
      let options = {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (body !== null) options.body = JSON.stringify(body);
      const res = await fetch(url, options);
      const response = await res.json();
      if (res.status !== 200) throw response;

      return response;
    } catch (err) {
      throw err;
    }
  }
