import React from "react";

export default function JobPostModal({ open, onClose, onSubmit, recruiterId }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,24,27,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#18181b', color: '#fff', borderRadius: 24, padding: 0, width: '90vw', maxWidth: 1200, minHeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#23272a', padding: '32px 48px 24px 48px', borderBottom: '1px solid #333' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: 0.5 }}>Post a New Job</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>&times;</button>
        </div>
        {/* Form Content */}
        <form onSubmit={onSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 48, padding: '40px 48px', background: '#18181b', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Job Title
              <input name="jobTitle" placeholder="Job Title" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Recruiter User ID
              <input name="recruiter" placeholder="Recruiter User ID" value={recruiterId || ''} disabled style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#b0b0b0', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Company Name
              <input name="companyName" placeholder="Company Name" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Company Logo URL
              <input name="companyLogo" placeholder="Company Logo URL (optional)" style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Job Description
              <textarea name="jobDescription" placeholder="Job Description" required rows={5} style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Job Type
              <input name="jobType" placeholder="Full-time, Part-time, etc." required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Experience Level
              <input name="experienceLevel" placeholder="Junior, Mid, Senior" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
          </div>
          {/* Right Column */}
          <div style={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Category
              <input name="category" placeholder="Category" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Required Skills
              <input name="requiredSkills" placeholder="Required Skills (comma separated)" style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Location
              <input name="location" placeholder="Location" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <div style={{ display: 'flex', gap: 16 }}>
              <label style={{ fontWeight: 600, flex: 1 }}>Salary Min
                <input name="salaryMin" type="number" min={0} placeholder="Min Salary" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
              </label>
              <label style={{ fontWeight: 600, flex: 1 }}>Salary Max
                <input name="salaryMax" type="number" min={0} placeholder="Max Salary" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
              </label>
            </div>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Deadline
              <input name="deadline" type="date" style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>Test Required?
              <input name="isTestRequired" type="checkbox" style={{ marginLeft: 8, width: 20, height: 20 }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Number of Openings
              <input name="openings" type="number" min={1} placeholder="Number of Openings" style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
            <label style={{ fontWeight: 600, marginBottom: 4 }}>Contact Email
              <input name="contactEmail" placeholder="Contact Email" type="email" required style={{ marginTop: 6, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#23272a', color: '#fff', fontWeight: 500, fontSize: 17, width: '100%' }} />
            </label>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 18, flexBasis: '100%', marginTop: 24, minWidth: 180 }}>
            <button type="button" onClick={onClose} style={{ padding: '14px 36px', background: '#23272a', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 18, border: '1px solid #444', marginBottom: 12, width: '100%' }}>Cancel</button>
            <button type="submit" style={{ padding: '16px 36px', background: '#2563eb', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 18, border: 'none', width: '100%' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
