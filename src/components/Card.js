import React, { useState, useEffect } from 'react'; 
import { db } from '../firebase';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';

function Card({ cardId, title, description }) {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  const handleLike = async () => {
    await setDoc(doc(db, 'cards', cardId), { likes: likes + 1 }, { merge: true });
    setLikes(likes + 1);
  };


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  const handleAddComment = async () => {
    const newComment = { text: comment, likes: 0 }; 
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setComment('');
    await setDoc(doc(db, 'cards', cardId), { comments: arrayUnion(newComment) }, { merge: true });
  };

  const handleCommentLike = async (index) => {
    const updatedComments = comments.map((c, i) =>
      i === index ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updatedComments);

 
    await setDoc(doc(db, 'cards', cardId), { comments: updatedComments }, { merge: true });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'cards', cardId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikes(data.likes || 0);
        setComments(data.comments || []);
      } else {
        console.log(`Documento ${cardId} não encontrado, será criado ao interagir.`);
      }
    });

    return () => unsubscribe();
  }, [cardId]);

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleLike}>Curtir ({likes})</button>
      <h3>Comentários:</h3>
      {comments.map((c, index) => (
        <div key={index} className="comment">
          <p>{c.text}</p>
          {c.text && ( // Só renderiza o botão de curtir se o comentário existir
            <button onClick={() => handleCommentLike(index)}>
              Curtir Comentário ({c.likes})
            </button>
          )}
        </div>
      ))}
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Digite seu comentário"
      />
      <button onClick={handleAddComment}>Adicionar Comentário</button>
    </div>
  );
}

export default Card;