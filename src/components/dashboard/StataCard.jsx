

const StataCard = ({stat}) => {
    const{value,icon,title}=stat;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-2xl text-[#5C53FE]">{icon}</div>
      </div>

      <h3 className="text-3xl font-bold text-white">{value}</h3>

      <p className="mt-2 text-sm text-gray-400">{title}</p>
    </div>
  );
};

export default StataCard;
