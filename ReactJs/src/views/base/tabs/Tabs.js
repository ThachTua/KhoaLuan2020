import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader
} from '@coreui/react'
import Add from './Add'
import Tools from '../../Tools/Tools'
//import CIcon from '@coreui/icons-react'

const Tabs = () => {
  //const [active, setActive] = useState(1)
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

  return (
    <CRow>
      <CCol className="mb-4">
      <CCardHeader>
            <Tools/>
      </CCardHeader>
        <CCard>

          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Hợp đồng
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Thêm mới
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Messages
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                 <Add/>
                </CTabPane>
                <CTabPane>

                </CTabPane>
                <CTabPane>
                  {`3. ${lorem}`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default Tabs
