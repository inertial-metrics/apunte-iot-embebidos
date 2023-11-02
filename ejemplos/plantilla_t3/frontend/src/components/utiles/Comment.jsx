const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-800 opacity-90 p-4 rounded-md">
      <p className="text-green-400 italic font-mono">{comment}</p>

      <p className="font-mono mt-4 text-slate-400 italic text-sm">
        Esto es solo un comentario (borrenlo){" "}
      </p>
    </div>
  );
};

export default Comment;
