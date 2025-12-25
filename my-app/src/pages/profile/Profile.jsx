import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";
import { getStudentProfileAPI, updateStudentProfileAPI } from "../../api/student.api";
import { getTeacherProfileAPI, updateTeacherProfileAPI } from "../../api/teacher.api";
import { FiUser, FiMail, FiMapPin, FiPhone, FiBook, FiSave } from "react-icons/fi";

const emptyAddress = { line1: "", city: "", state: "", zip: "" };

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isStudent = user?.role === "STUDENT";
  const isTeacher = user?.role === "TEACHER";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (isStudent) {
          const res = await getStudentProfileAPI();
          setProfile(res.data);
        } else if (isTeacher) {
          const res = await getTeacherProfileAPI();
          setProfile(res.data);
        } else {
          setProfile({ id: user.id, role: user.role });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) loadProfile();
  }, [user, isStudent, isTeacher]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      address: { ...(prev?.address || emptyAddress), [field]: value },
    }));
  };

  const saveProfile = async () => {
    if (!isStudent && !isTeacher) return;
    setSaving(true);
    try {
      if (isStudent) {
        await updateStudentProfileAPI({
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
          address: profile.address || emptyAddress,
        });
      } else if (isTeacher) {
        await updateTeacherProfileAPI({
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
          address: profile.address || emptyAddress,
        });
      }
      alert("Profile saved");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Profile not available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          {(isStudent || isTeacher) && (
            <button
              onClick={saveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300"
            >
              <FiSave /> {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser /> Basic Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  value={profile.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="flex items-center gap-2">
                  <FiMail className="text-gray-500" />
                  <span className="text-gray-900">{profile.email || "Not available"}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-500" />
                  <input
                    value={profile.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">School</label>
                <span className="text-gray-900">{profile.school || "—"}</span>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Role</label>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm font-medium">
                  {user.role}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMapPin /> Address
            </h2>
            <div className="space-y-3">
              <input
                value={profile.address?.line1 || ""}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                placeholder="Address line"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  value={profile.address?.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  value={profile.address?.state || ""}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  value={profile.address?.zip || ""}
                  onChange={(e) => handleAddressChange("zip", e.target.value)}
                  placeholder="ZIP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiBook /> Bio
            </h2>
            <textarea
              value={profile.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={6}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Avatar URL</label>
                <input
                  value={profile.avatarUrl || ""}
                  onChange={(e) => handleChange("avatarUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <p className="text-sm text-gray-500">
                Keep your profile up to date so your teachers and classmates can reach you.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
