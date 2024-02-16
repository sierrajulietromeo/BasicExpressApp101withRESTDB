import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

//new database api object
const databaseAPI = {
  url: 'https://dbaccess-c342.restdb.io/rest/names',
  config: {
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': process.env.REST_API_KEY
    }
  },
  async write(name) {
    try {
      const postResponse = await axios.post(this.url, name, this.config);
      console.log('Database updated new name:', postResponse.data);
    } catch (error) {
      console.error('Error updating database:', error);
      throw error; 
    }
  },
  async read() {
    try {
      const response = await axios.get(this.url, this.config);
      return response.data; 
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  },
  async delete(id) {
    try {
      const deleteUrl = `${this.url}/${id}`;
      await axios.delete(deleteUrl, this.config);
    } catch (error) {
      console.error('Error deleting name:', error);
      throw error;
    }
  }
};
export default databaseAPI;