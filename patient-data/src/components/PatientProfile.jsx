export default function PatientProfile({ patient }) {
  if (!patient) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const rows = [
    { icon: '/BirthIcon.svg', label: 'Date Of Birth', value: formatDate(patient.date_of_birth) },
    { icon: '/FemaleIcon.svg', label: 'Gender', value: patient.gender },
    { icon: '/PhoneIcon.svg', label: 'Contact Info', value: patient.phone_number },
    { icon: '/PhoneIcon.svg', label: 'Emergency Contacts', value: patient.emergency_contact },
    { icon: '/InsuranceIcon.svg', label: 'Insurance Provider', value: patient.insurance_type },
  ];

  return (
    <aside className="patient-profile">
      <div className="profile-header">
        <img
          src={patient.profile_picture}
          alt={patient.name}
          className="profile-avatar"
        />
        <h2 className="profile-name">{patient.name}</h2>
      </div>

      <div className="profile-info">
        {rows.map((row, i) => (
          <div className="profile-row" key={i}>
            <img src={row.icon} alt={row.label} className="profile-row-icon" />
            <div className="profile-col">
              <span className="profile-label">{row.label}</span>
              <span className="profile-value">{row.value}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="show-all-info-btn">Show All Information</button>
    </aside>
  );
}
