"use client";

import { useState } from "react";
import { Record } from "@/types/record";

export default function Home() {
  //１.データの状態管理（最初は空、またはサンプルデータ）
  const [records, setRecords] = useState<Record[]>([
    { id: "1", title: "ランチ", amount: 1200, date: "2026-05-13" },
    { id: "2", title: "コーヒー", amount: 500, date: "2026-05-14" },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  //新しい記録を追加する関数
  const addRecord = () => {
    if (!title || amount <= 0) return; //空や０円はretune

    const newRecord: Record = {
      id: crypto.randomUUID(),//ランダムID作成
      title: title,
      amount: amount,
      date: new Date().toLocaleDateString(),//今日の日付
    };

    setRecords([newRecord, ...records]);// リストの先頭に追加
    setTitle("");//入力欄を空にする
    setAmount(0);//金額を０に戻す
  };

  const deleteRecord = (id:string) => {
      //指定されたIDと「一致しない」ものだけを抽出して新しいリストを作成
      const updatedRecords = records.filter((record) => record.id !== id);
      setRecords(updatedRecords);
    }

  //2.合計金額の計算
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (
    <main className="bg-white p-6 bg-amber-50 p-8 text-gray-800">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-amber-800">
          シンプル家計簿
        </h1>

        {/* 合計表示エリア */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex justify-between items-center border-b-4 border-amber-200">
          <span className="text-lg font-medium">現在の合計支出</span>
          <span className="text-3xl font-bold text-amber-600">
            ¥{totalAmount.toLocaleString()}
          </span>
        </div>

        {/* 入力フォームエリア */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <div className="flex flex-col gap-4">
            <input 
              type="text"
              placeholder="なにに使った？" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input 
              type="number" 
              placeholder="金額" 
              value={amount === 0 ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value))} 
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button 
              onClick={addRecord} 
              className="bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              記録する
            </button>
          </div>
        </div>
        
        {/* 履歴リスト */}
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-xl flex justify-between shadow-sm">
              <div>
                <p className="font-bold">{record.title}</p>
                <p className="text-xs text-gray-400">{record.date}</p>

                {/*削除機能*/}
                <button 
                  onClick={() => deleteRecord(record.id)}
                  className="text-red-400 hover:text-red-600 text-sm transition-colors"
                >
                  削除
                </button>
              </div>
              <p className="font-mono font-bold text-lg">¥{record.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 