import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '1ef9d7651b6041f9a3fa4963d3ee0f96'
   });

export const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))   
   }


export const handleImage = (req, res, db) => {
    const { id } = req.body;
        db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
    .catch(err => res.status(400).json('Unable to get entries'))    
}
