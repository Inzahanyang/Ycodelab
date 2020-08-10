import Head from "next/head";
import produce from "immer";
import _ from "lodash";
import { useState, useCallback, useEffect } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    let result = localStorage.getItem("todo-list");
    if (!result) {
      result = [];
    } else {
      try {
        result = JSON.parse(result);
      } catch (e) {
        result = [];
      }
    }
    setList(result);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const addItem = useCallback(() => {
    const item = {
      id: new Date().getTime().toString(),
      text,
    };
    setList([...list, item]);
    setText("");
  }, [list, text]);

  const removeItem = useCallback(
    id => {
      setList(_.reject(list, item => item.id === id));
    },
    [list]
  );

  const done = useCallback(
    id => {
      const newList = produce(list, draft => {
        const target = list.find(item => item.id === id);
        const index = list.indexOf(target);
        draft[index].isDone = !target.isDone;
      });
      setList(newList);
    },
    [list]
  );

  return (
    <div className="py-8 px-16">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold">TO_DO List</h1>

      <div>
        <input type="text" className="border p-1 mr-2" value={text} onChange={e => setText(e.target.value)} />
        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          추가
        </button>
      </div>

      <ul className="list-disc">
        {list.map(item => (
          <li>
            <input type="checkbox" className="mr-2" checked={!!item.isDone} onChange={() => done(item.id)} />
            <span className={item.isDone ? "line-through text-gray-500" : ""}>{item.text}</span>
            <button className="ml-2 text-xs text-red-500" onClick={() => removeItem(item.id)}>
              [삭제]
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
