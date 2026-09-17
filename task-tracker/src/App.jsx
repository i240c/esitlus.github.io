import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Map out the presentation', tag: 'Planning', done: true },
    { id: 2, title: 'Create the first project draft', tag: 'In progress', done: false },
    { id: 3, title: 'Review the final slides', tag: 'Review', done: false },
  ])
  const completedTasks = tasks.filter((task) => task.done).length
  const completionPercent = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0

  function toggleTask(id) {
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    ))
  }

  function addTask() {
    const title = window.prompt('What needs to be done?')
    if (title?.trim()) {
      setTasks((currentTasks) => [...currentTasks, {
        id: Date.now(), title: title.trim(), tag: 'New', done: false,
      }])
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="/" aria-label="Taskflow home"><span className="brand-mark">T</span><span>taskflow</span></a><div className="topbar-actions"><span className="date-label">Thursday, September 17</span><button className="avatar" type="button" aria-label="Open profile">AK</button></div></header>
      <div className="content">
        <section className="welcome-row"><div><p className="eyebrow">Your workspace</p><h1>Good morning, Andre.</h1><p className="subtitle">A clear plan makes room for great work.</p></div><button className="primary-button" type="button" onClick={addTask}><span aria-hidden="true">+</span> Add task</button></section>
        <section className="stats-grid" aria-label="Workspace summary"><article className="stat-card stat-card-highlight"><div className="stat-icon">✦</div><div><p>Today&apos;s focus</p><strong>{tasks.length - completedTasks} open tasks</strong></div><span className="trend">On track</span></article><article className="stat-card"><div className="stat-icon soft">✓</div><div><p>Completed</p><strong>{completedTasks} of {tasks.length} tasks</strong></div><span className="stat-number">{completionPercent}%</span></article><article className="stat-card"><div className="stat-icon warm">◷</div><div><p>Time this week</p><strong>12h 40m</strong></div><span className="trend muted">+8%</span></article></section>
        <section className="dashboard-grid"><article className="panel tasks-panel"><div className="panel-heading"><div><h2>My tasks</h2><p>Keep the momentum going</p></div><button className="text-button" type="button" onClick={() => setTasks([])}>Clear all</button></div><div className="task-list">{tasks.length === 0 && <p className="empty-state">All clear. Add a task to get started.</p>}{tasks.map((task) => <label className={`task-row ${task.done ? 'is-done' : ''}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="checkmark" aria-hidden="true">✓</span><span className="task-copy"><strong>{task.title}</strong><small>{task.done ? 'Completed just now' : 'Due today'}</small></span><span className="task-tag">{task.tag}</span></label>)}</div></article><aside className="panel progress-panel"><div className="panel-heading"><div><h2>Weekly progress</h2><p>Sep 14 - Sep 20</p></div><span className="mini-menu">•••</span></div><div className="progress-ring"><strong>{completionPercent}<small>%</small></strong><span>complete</span></div><div className="progress-bar"><span style={{ width: `${completionPercent}%` }} /></div><p className="progress-note"><strong>Nice start!</strong> Finish one more task to beat last week.</p></aside></section>
      </div>
    </main>
  )
}

export default App
