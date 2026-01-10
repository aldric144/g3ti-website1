// G3TI Access Control Configuration
// Tier-2 Passcode Authentication

const G3TI_ACCESS = {
  GOV_PASSCODE: 'G3TI-GOV-9147',
  LE_PASSCODE: 'G3TI-LE-7725'
};

// Verify passcode function
function verifyPasscode(type, code) {
  if (type === 'gov') {
    return code === G3TI_ACCESS.GOV_PASSCODE;
  } else if (type === 'le') {
    return code === G3TI_ACCESS.LE_PASSCODE;
  }
  return false;
}
