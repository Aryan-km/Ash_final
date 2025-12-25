import { useState } from "react";
import Card from "../../components/Card";
import { createTeacherAPI } from "../../api/admin.api";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCheckCircle } from "react-icons/fi";

const emptyAddress = { line1: "", city: "", state: "", zip: "" };

export default function AdminCreateTeacher() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    phone: "",
    address: emptyAddress,
    bio: "",
    avatarUrl: ""
  });
  const [saving, setSaving] = useState(false);

  const handleAddress = (field, value) => {
    setForm((prev) => ({
      ...prev,
      address: { ...(prev.address || emptyAddress), [field]: value }
    }));
  };

  const submit = async () => {
    setSaving(true);
    try {
      await createTeacherAPI(form);
      alert("Teacher created");
      setForm({
        name: "",
        email: "",
        password: "",
        school: "",
        phone: "",
        address: emptyAddress,
        bio: "",
        avatarUrl: ""
      });
    } catch (error) {
      console.error("Error creating teacher:", error);
      alert("Failed to create teacher");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Teacher</h1>
          <p className="text-gray-600">Add a new teacher to a school</p>
        </div>

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">School</label>
              <input
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-500" />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600 mb-1">Avatar URL</label>
              <input
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2"><FiMapPin /> Address</label>
              <input
                value={form.address.line1}
                onChange={(e) => handleAddress("line1", e.target.value)}
                placeholder="Address line"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  value={form.address.city}
                  onChange={(e) => handleAddress("city", e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  value={form.address.state}
                  onChange={(e) => handleAddress("state", e.target.value)}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  value={form.address.zip}
                  onChange={(e) => handleAddress("zip", e.target.value)}
                  placeholder="ZIP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={submit}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300"
            >
              <FiCheckCircle />
              {saving ? "Saving..." : "Create Teacher"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

