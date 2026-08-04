export function SOSButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button className="sos-button" onClick={onClick} disabled={disabled}>
      SOS
    </button>
  )
}
