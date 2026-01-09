import { useState, useRef, useEffect } from 'react'
import './VoucherTable.css'

const vouchersData = [
  { id: 1, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Marcus Septimus', status: true },
  { id: 2, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Gretchen Curtis', status: true },
  { id: 3, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Tiana Workman', status: true },
  { id: 4, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Lincoln Ekstrom Bothman', status: true },
  { id: 5, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Miracle Schleifer', status: false },
  { id: 6, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Carter Lipshutz', status: true },
  { id: 7, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Ruben Lubin', status: true },
  { id: 8, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Mira Dias', status: true },
  { id: 9, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Skylar Septimus', status: true },
  { id: 10, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Livia Septimus', status: true },
  { id: 11, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Brandon Korsgaard', status: true },
  { id: 12, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Cooper Stanton', status: true },
]

function VoucherTable() {
  const [vouchers, setVouchers] = useState(vouchersData)
  const [selectedColumn, setSelectedColumn] = useState('name')
  const [openMenuId, setOpenMenuId] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (id) => {
    setVouchers(vouchers.map(v => 
      v.id === id ? { ...v, status: !v.status } : v
    ))
  }

  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleView = (id) => {
    console.log('View voucher:', id)
    setOpenMenuId(null)
  }

  const handleDelete = (id) => {
    console.log('Delete voucher:', id)
    setOpenMenuId(null)
  }

  return (
    <div className="voucher-table-container">
      <table className="voucher-table">
        <thead>
          <tr>
            <th className={`col-checkbox ${selectedColumn === 'name' ? 'selected-start' : ''}`}>
              <input type="checkbox" />
            </th>
            <th className={`col-name ${selectedColumn === 'name' ? 'selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Voucher Name
            </th>
            <th className={`col-type ${selectedColumn === 'type' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Type
            </th>
            <th className={`col-amount ${selectedColumn === 'amount' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Amount
            </th>
            <th className={`col-code ${selectedColumn === 'code' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Voucher Code
            </th>
            <th className={`col-expiry ${selectedColumn === 'expiry' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Expiry Date
            </th>
            <th className={`col-assign ${selectedColumn === 'assign' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Assign To
            </th>
            <th className={`col-status ${selectedColumn === 'status' ? 'selected-start selected-end' : ''}`}>
              <span className="col-divider">⋮</span>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id}>
              <td className="col-menu">
                <div className="menu-wrapper" ref={openMenuId === voucher.id ? menuRef : null}>
                  <button 
                    className="menu-btn"
                    onClick={() => handleMenuClick(voucher.id)}
                  >
                    ⋮
                  </button>
                  {openMenuId === voucher.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleView(voucher.id)}>
                        View <span>›</span>
                      </button>
                      <button onClick={() => handleDelete(voucher.id)}>
                        Delete <span>›</span>
                      </button>
                    </div>
                  )}
                </div>
              </td>
              <td className="col-name">{voucher.name}</td>
              <td className="col-type">{voucher.type}</td>
              <td className="col-amount">{voucher.amount}</td>
              <td className="col-code">{voucher.code}</td>
              <td className="col-expiry">{voucher.expiry}</td>
              <td className="col-assign">{voucher.assignTo}</td>
              <td className="col-status">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={voucher.status}
                    onChange={() => handleToggle(voucher.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VoucherTable
