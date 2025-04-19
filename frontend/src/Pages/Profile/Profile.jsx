import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faClipboardList,
  faPlus,
  faHistory,
  faChartLine,
  faSignOutAlt,
  faCircleQuestion,
  faCog,
  faMedal
} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import CreateQuestion from '../../Components/Profile_components/CreateQuestion';
import ProfileOverview from '../../Components/Profile_components/ProfileOverview';
import MyQuestion from '../../Components/Profile_components/MyQuestion';
import TakeTest from '../../Components/Profile_components/TakeTest';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (!user) {
    navigate('/register?component=login');
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileOverview />;
      case 'tests':
        return <TakeTest />;
      case 'create':
        return <CreateQuestion />;
      case 'myquestion':
        return <MyQuestion />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h3>{user.name}</h3>
        </div>

        <div className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} />
            Profile Overview
          </button>
          <button
            className={`menu-item ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            Take Tests
          </button>
          <button
            className={`menu-item ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Questions
          </button>
          <button
            className={`menu-item ${activeTab === 'myquestion' ? 'active' : ''}`}
            onClick={() => setActiveTab('myquestion')}
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
            My Question
          </button>
        </div>

        <div className="sidebar-footer">

          <button className="menu-item logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile; 