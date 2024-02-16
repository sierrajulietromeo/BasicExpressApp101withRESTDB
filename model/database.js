import axios from 'axios';

//new database api object
const databaseAPI = {
  apiKey: process.env['REST_DB_KEY'],
  url: 'https://dbaccess-c342.restdb.io/rest/names',
  config: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  async write(name) {
    try {
      const postResponse = await axios.post(this.url, name, { ...this.config, headers: { ...this.config.headers, 'x-apikey': this.apiKey } });
      console.log('Database updated new name:', postResponse.data);
    } catch (error) {
      console.error('Error updating database:', error);
      throw error; 
    }
  },

  async read() {
    try {
      const response = await axios.get(this.url, { ...this.config, headers: { ...this.config.headers, 'x-apikey': this.apiKey } });
      return response.data; 
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  },

  async delete(id) {
    try {
      const deleteUrl = `${this.url}/${id}`;
      await axios.delete(deleteUrl, { ...this.config, headers: { ...this.config.headers, 'x-apikey': this.apiKey } });
    } catch (error) {
      console.error('Error deleting name:', error);
      throw error;
    }
  }
};

export default databaseAPI;