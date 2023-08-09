import { ArrowLeftOutlined, CaretDownOutlined, EditOutlined, MailOutlined, MoreOutlined } from '@ant-design/icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Divider, Dropdown, Image } from 'antd'
import React from 'react'
import { routes } from '../../../controller/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { reverse } from 'named-urls'
import { Icons } from '../../../controller/Images'

const PaymentModeView = () => {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <div className='item-view-container w-100 bg-white'>
      <div className='w-100 border-bottom'>
        <div className='d-flex justify-content-between align-items-center p-4 px-3'>
          <div className='d-flex  align-items-center gap-2 fs-5 '>
            <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
            <span className='fw-medium'>Payment Name </span>
          </div>
          <div className='d-flex justify-content-center align-items-center gap-2 '>
            <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.purchase.paymentMode.edit, { id: params.id }))}><EditOutlined /></Button>
            <Button className='d-flex justify-content-center align-items-center'><MailOutlined /> Email</Button>
            <Dropdown
              trigger='click'
              menu={{
                items: [
                  {
                    label: 'PDF',
                    key: 1
                  },
                  {
                    label: 'Print',
                    key: 2
                  }
                ]
              }}
            >
              <Button className='d-flex align-items-center'><Image src={Icons.fileIcon} alt='' width={15} preview={false} /> <span>PDF / Print</span><CaretDownOutlined /></Button>
            </Dropdown>
            <Dropdown
              trigger='click'
              menu={{
                items: [
                  {
                    label: 'Refund',
                    key: 1
                  },
                  {
                    label: 'Delete',
                    key: 2
                  }
                ]
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="w-100 p-4"
        style={{
          maxHeight: '83vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '79px'
        }}>
        <div className=' w-100 pdf-box p-5 rounded-1'>
          <div className='d-flex flex-column'>
            <span className='fw-medium fs-4'>Personal</span>
            <span className='text-muted mt-2 fw-semibold'>Delhi </span>
            <span className='text-muted fw-semibold'>India</span>
          </div>
          <Divider />
          <div className='text-center w-100'><span className='border-bottom fs-3'>PAYMENTS MADE</span></div>
          <div className='w-100 row col-12'>
            <div className='col-8'>
              <div className='row col-12 lh-lg'>
                <div className='col-4 text-muted'>Payment#</div>
                <div className='col-8 border-bottom fw-semibold'>1</div>
                <div className='col-4 text-muted'>Payment Date</div>
                <div className='col-8 border-bottom fw-semibold'>19/07/2023</div>
                <div className='col-4 text-muted'>Reference Number</div>
                <div className='col-8 border-bottom fw-semibold'>bill payment reference</div>
                <div className='col-4 text-muted'>Paid To</div>
                <div className='col-8 border-bottom fw-semibold'>kumar, Neeraj</div>
                <div className='col-4 text-muted'>Payment Mode</div>
                <div className='col-8 border-bottom fw-semibold'>Cash</div>
                <div className='col-4 text-muted'>Paid Through</div>
                <div className='col-8 border-bottom fw-semibold'>Petty Cash</div>
                <div className='col-4 text-muted'>Amount Paid In Words</div>
                <div className='col-8 border-bottom fw-semibold'>Indian Rupee Two Thousand Only</div>

              </div>
            </div>
            <div className='col-4 d-flex justify-content-center'>
              <div className='d-flex flex-column justify-content-center align-items-center p-4 bg-success text-white' style={{ width: '200px', height: '100px' }} >
                <span>Amount Paid</span>
                <span className='fs-4'>Rs.2,000.00</span>
              </div>
            </div>
            <div className='col-12 mt-5'>
              <span className='text-muted fw-bold'>Paid To</span>
              <div className='d-flex flex-column'>
                <span className='text-dark fw-semibold'>kumar, Neeraj</span>
                <span>1st 60 Feet Rd</span>
                <span>New Delhi</span>
                <span>110044 Delhi</span>
                <span>110044 Delhi</span>
              </div>
            </div>
          </div>
          <Divider className='mb-1' />
          <div className='text-end w-100'><span className='text-muted'>Over payment: Rs.2,000.00</span></div>
        </div>
        <div className='mt-4'>
          <span className='fs-5 fw-medium'>More Information</span>
          <div className='row col-12'>
            <div className='col-6'>
              <div className='row col-12'>
                <div className='col-5 text-muted'>Notes</div>
                <div className='col-2'>: </div>
                <div className='col-5'>Notes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModeView