import React, { useState } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function App() {
  const [entry, setEntry] = useState({
    date: '', moon: '', period: '', microbes: '', meds: '',
    music: '', work: '', sleep: '', notes: '', triggers: ''
  });
  const [data, setData] = useState([]);

  const handleChange = (field, value) => {
    setEntry({ ...entry, [field]: value });
  };

  const handleSubmit = () => {
    if (!entry.date) return;
    setData([...data, { ...entry }]);
    setEntry({ date: '', moon: '', period: '', microbes: '', meds: '', music: '', work: '', sleep: '', notes: '', triggers: '' });
  };

  const numericData = data.map(e => ({
    ...e,
    sleep: +e.sleep || 0,
    work: +e.work || 0,
    period: +e.period || 0
  }));

  return (
    <div style={{ padding: 20 }}>
      <h1>Bipolar Tracker</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {['date', 'moon', 'period', 'microbes', 'meds', 'music', 'work', 'sleep'].map(f => (
          f === 'date' ?
            <input key={f} type="date" value={entry[f]} onChange={e => handleChange(f, e.target.value)}/> :
            <input key={f} placeholder={f} value={entry[f]} onChange={e => handleChange(f, e.target.value)}/>
        ))}
        <textarea placeholder="notes" value={entry.notes} onChange={e => handleChange('notes', e.target.value)} />
        <textarea placeholder="triggers" value={entry.triggers} onChange={e => handleChange('triggers', e.target.value)} />
      </div>
      <button onClick={handleSubmit} style={{ margin: '10px 0' }}>Add Entry</button>

      {numericData.length > 0 && (
        <LineChart width={800} height={400} data={numericData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="Sleep"/>
          <Line type="monotone" dataKey="work" stroke="#82ca9d" name="Work"/>
          <Line type="monotone" dataKey="period" stroke="#ffc658" name="Period"/>
        </LineChart>
      )}
    </div>
  );
}

export default App;
