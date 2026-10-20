import { EXAMS } from '../data/exams';

function Sidebar({ activeExam, onSelect }) {
  return (
    <nav className="sidebar">
      {EXAMS.map((exam) => (
        <button
          key={exam.id}
          className={exam.id === activeExam ? 'tab active' : 'tab'}
          onClick={() => onSelect(exam.id)}
        >
          <strong>{exam.title}</strong>
          <br />
          {exam.name}
          <br />
          <small>{exam.hook}</small>
        </button>
      ))}
    </nav>
  );
}

export default Sidebar;
