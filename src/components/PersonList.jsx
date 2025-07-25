import { useState } from "react";

function PersonList() {
  const [data, setData] = useState([
    { id: 1, name: "โน๊ต", gender: "ชาย" },
    { id: 2, name: "น้อย", gender: "ชาย" },
    { id: 3, name: "น้ำ", gender: "หญิง" },
  ]);
  const [show, setShow] = useState(true);
  return (
    <div>
      <h1>จำนวนประชากร {data.length} คน</h1>
      <button onClick={() => setShow(!show)}>
        {show ? "ซ่อน" : "แสดง"} รายการ
      </button>
      <ul>
        {show &&
          data.map((item) => (
            <li key={item.id}>
              <h3>
                {item.id} | {item.name} | {item.gender}
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PersonList;
