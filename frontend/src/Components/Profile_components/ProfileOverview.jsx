import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';
import './ProfileOverview.css';

const ProfileOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    testsTaken: 0,
    averageScore: 0,
    questionsCreated: 0,
    achievements: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user || !user._id) return;
      
      try {
        setLoading(true);
        console.log("Fetching stats for user:", user._id);
        
        // 1. Get test performance stats
        const performanceResponse = await axios.get(`http://localhost:5000/api/test/performance/${user._id}`);
        console.log("Performance data:", performanceResponse.data);
        
        // 2. Get question count using a direct endpoint (no auth required)
        const questionCountResponse = await axios.get(`http://localhost:5000/api/questions/count/${user._id}`);
        console.log("Question count data:", questionCountResponse.data);
        
        // Calculate stats from test records
        let testCount = 0;
        let overallPercentage = 0;
        let questionsCreated = 0;
        
        // Parse test performance data
        if (performanceResponse.data && performanceResponse.data.categoryStats) {
          const categoryStats = performanceResponse.data.categoryStats;
          testCount = Object.keys(categoryStats).length;
          overallPercentage = parseFloat(performanceResponse.data.overallPercentage) || 0;
        }
        
        // Parse question count
        if (questionCountResponse.data && typeof questionCountResponse.data.count === 'number') {
          questionsCreated = questionCountResponse.data.count;
        }
        
        // Set the stats with all the data
        setStats({
          testsTaken: testCount,
          averageScore: overallPercentage,
          questionsCreated: questionsCreated,
          achievements: calculateAchievements(testCount, overallPercentage, questionsCreated)
        });
        
        setError(null);
      } catch (err) {
        console.error("Error fetching user stats:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserStats();
  }, [user]);
  
  // Calculate achievements based on user activity
  const calculateAchievements = (tests, avgScore, questions) => {
    let achievements = 0;
    
    // Tests taken achievements
    if (tests >= 1) achievements++;
    if (tests >= 5) achievements++;
    
    // Score achievements
    if (avgScore >= 50) achievements++;
    if (avgScore >= 80) achievements++;
    
    // Questions created achievements
    if (questions >= 1) achievements++;
    if (questions >= 5) achievements++;
    
    return achievements;
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="profile-overview-container">
      <div className="profile-header-section">
        <div className="profile-avatar-large">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2>{user.name}</h2>
        <p className='email'>{user.email}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tests Taken</h3>
          <p className="stat-number">{loading ? "..." : stats.testsTaken}</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p className="stat-number">{loading ? "..." : `${stats.averageScore}%`}</p>
        </div>
        <div className="stat-card">
          <h3>Questions Created</h3>
          <p className="stat-number">{loading ? "..." : stats.questionsCreated}</p>
        </div>
        <div className="stat-card">
          <h3>Achievements</h3>
          <p className="stat-number">{loading ? "..." : stats.achievements}</p>
        </div>
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfileOverview;
