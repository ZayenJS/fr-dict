import express from 'express';
import dictionaryFr from 'dictionary-fr';

const app = express();

app.get('/:word', async (req, res, next) => {
  const { word } = req.params;

  const wordExists = await searchWord(word);

  res.send({ word, wordExists });
});

async function searchWord(word: string) {
  return new Promise((resolve, reject) => {
    dictionaryFr((error, fr) => {
      if (error) reject(error);

      const _words = String(fr.dic);

      const words = _words
        .split('\n')
        .map((word) => word.split('/')[0])
        .filter((word) => /[a-z]/gi.test(word));

      resolve(words.includes(word));
    });
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
