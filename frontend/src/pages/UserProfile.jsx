import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <div>Loading...</div>; // or redirect
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
};

export default UserProfile;
