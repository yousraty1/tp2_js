const express = require('express');
const mongoose = require('mongoose');
const Client = require('./models/Client');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://admin:1234@localhost:27017/Clientdb?authSource=admin')
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur MongoDB:', err));

app.post('/clients', async (req, res) => {
    try {
      const client = new Client({
        id: req.body.id,  
        nom: req.body.nom,
        age: req.body.age
      });
      
      await client.save();
      res.status(201).json(client);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


app.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});
app.get('/clients/:id', async (req, res) => {
    try {
      const client = await Client.findOne({ id: req.params.id }); 
      if (!client) return res.status(404).json({ message: 'Client non trouvé' });
      res.json(client);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.delete('/clients/:id', async (req, res) => {
    try {
      const client = await Client.findOneAndDelete({ id: req.params.id });  
      if (!client) return res.status(404).json({ message: 'Client non trouvé' });
      res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.put('/clients/:id', async (req, res) => {
    const id = req.params.id;  
    const { nom, age } = req.body;  
  
    try {
   
      const client = await Client.findOneAndUpdate(
        { id: id },  
        { nom, age }, 
        { new: true } 
      );
  
     
      if (!client) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }
  

      res.json(client);
    } catch (err) {
  
      res.status(500).json({ message: err.message });
    }
  });
  
  

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
