function StatCart({ title, value, Icon: Icon }) {
  return (
    <div className="bg-gray-100 shadow-md p-6 rounded-lg flex flex-col gap-3">
      <div className="flex items-center justify-between text-gray-600">
        <p className="text-sm font-medium">{title}</p>
        {Icon && <Icon size="20" />}
      </div>
      <p className="text-2xl font-black text-gray-900 ">{value}</p>
    </div>
  );
}

export default StatCart;
