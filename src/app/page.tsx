"use client";

import { useState } from "react";
import { Record } from "@/types/record";

export default function Home() {
  //１.データの状態管理（最初は空、またはサンプルデータ）
  const [records, setRecords] = useState<Record[]>([
    { id: "1", title: "ランチ", amount: 1200, date: "2026-05-13" },
    { id: "2", title: "コーヒー", amount: 500, date: "2026-05-14" },
  ]);

  //2.合計金額の計算
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (
    <main className="bg-white p-6 bg-amber-50 p-8 text-gray-800">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-anber-800">
          シンプル家計簿
        </h1>

        {/* 合計表示エリア */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex justify-baetween items-center border-b-4 border-amber-200">
          <span className="text-lg font-medium">現在の合計支出</span>
          <span className="text-3xl font-bold text-amber-600">
            ¥{totalAmount.toLocaleString()}
          </span>
        </div>
        
        {/* 履歴リスト */}
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-xl flex justify-between shadow-sm">
              <div>
                <p className="font-bold">{record.title}</p>
                <p className="text-xs text-gray-400">{record.date}</p>
              </div>
              <p className="font-mono font-bold text-lg">¥{record.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 