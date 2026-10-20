import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { PreferencesProvider } from './components/PreferencesContext';
import { EXAMS } from './data/exams';
import SmartTaskCounter from './exams/SmartTaskCounter';
import LiveSearchTimer from './exams/LiveSearchTimer';
import AccessibleFormToolkit from './exams/AccessibleFormToolkit';
import Dashboard from './exams/Dashboard';
import ProductExplorer from './exams/ProductExplorer';
import IssueTrackerStateEngine from './exams/IssueTrackerStateEngine';

function App() {
  const [activeExam, setActiveExam] = useState(1);
  const currentExamName =
    EXAMS.find((exam) => exam.id === activeExam)?.name ?? 'Midterm Practical Exam';

  return (
    <PreferencesProvider>
      <div className="app">
        <Header title={currentExamName} />
        <div className="layout">
          <Sidebar activeExam={activeExam} onSelect={setActiveExam} />
          <main className="content">
            {activeExam === 1 && <SmartTaskCounter />}
            {activeExam === 2 && <LiveSearchTimer />}
            {activeExam === 3 && <AccessibleFormToolkit />}
            {activeExam === 4 && <Dashboard />}
            {activeExam === 5 && <ProductExplorer />}
            {activeExam === 6 && <IssueTrackerStateEngine />}
          </main>
        </div>
      </div>
    </PreferencesProvider>
  );
}

export default App;
