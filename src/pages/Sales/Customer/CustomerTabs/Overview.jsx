import React from 'react';
import {
  PhoneOutlined, 
  MobileOutlined,
  DownOutlined,
  UpOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  SettingFilled,
  PlusCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Button, Dropdown,Space,Radio, Image} from 'antd';
import { Link } from 'react-router-dom';
import userIcon from '../../../../assets/images/Icons/userIcon.png';
const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
  {
    label: '4rd menu item',
    key: '4',
  },
];
export const Overview = () => {
  const [address,setAddress] = React.useState(true)
  const [otherDetails,setOtherDetails] = React.useState(true)
  const [contactUs,setContactUs] =React.useState(true)
  const [recordInfo,setRecordInfo] =React.useState(true)
  const [size, setSize] = React.useState('large');
  const [editMoreDetails,setEditMoreDetails] = React.useState(true)
  const MoreDetails = ({title,titleType})=>{
    return(
      <div className='d-flex mt-3'>
            <p class="mb-0" style={{width:'18%'}}>{title}</p>
            {editMoreDetails?
              <div className = 'd-flex' style={{ marginLeft: 15, borderWidth: 0.5, padding: 5, backgroundColor: '#eceff1',height:32 }}>
               <p className='flex-grow-1'>{titleType}</p>
               <EditOutlined onClick={() => setEditMoreDetails(!editMoreDetails)} className='flex-grow-1' style={{marginLeft:25,marginTop:5}}/>
             </div>
             :<div style={{ marginLeft: 15,}}>
            <Dropdown menu={{items}}  trigger='click' >
              <Button>
                <Space>
                 Button
                 <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
              <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} style={{marginLeft:10}}>
                <Radio.Button value="close" className='flex-grow-1' style={{backgroundColor:'green'}} onClick={()=>setEditMoreDetails(!editMoreDetails)}><CloseOutlined style={{color:'#fff'}}/></Radio.Button>
                <Radio.Button value="check" className='flex-grow-1' style={{backgroundColor:'#fa541c'}} onClick={()=>setEditMoreDetails(!editMoreDetails)}><CheckOutlined style={{color:'#fff'}} /></Radio.Button>
              </Radio.Group>
              </div> }
          </div>
    )
  }
  let data=[
    {date:'20/07/2023 05:10 PM',
    title:'',
    text:'rtgrt by veeresh'
  },
  {date:'20/07/2023 05:10 PM',
    title:'Invoice added',
    text:'Invoice INV-000002 of amount Rs.211.00 created by veeresh '
  },
  {date:'20/07/2023 05:10 PM',
    title:'added 2',
    text:'Delivery Challan Chllan of amount Rs.56.00 created by veeresh'},
  {date:'20/07/2023 05:10 PM',
   title:'added 3',
   text:'Delivery Challan Tyu of amount Rs.165.00 created by veeresh'}
  ]
  return (
    <div className=" container w-100 h-100">
    <div class="row">
      <div class="col-4 bg-light h-100 p-4">
       <div class="border-bottom mt-2 pb-1">
         <h6>Test</h6>
       </div>
        <div class="row">
          <div class="col">
            <div class="card-body p-4 pl-0">
              <div class="d-flex text-black">
                <div class="flex-shrink-0">
                  <Image
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="img-fluid"
                    style={{ width: "100px", borderRadius: "10px" }}
                    preview={false}
                  />
                </div>
                <div class="flex-grow-1 ms-3">
                  <h5 class="mb-1">Mr.Test</h5>
                  <h8 style={{ color: "#2b2a2a" }}>Senior Journalist</h8>
                  <div class="d-flex">
                    <PhoneOutlined className='me-1 pt-1' />
                    <h8 class="me-1" style={{ color: "#2b2a2a" }}>123456789899</h8>
                  </div>
                  <div class="d-flex">
                    <MobileOutlined className='me-1 pt-1' />
                    <h8 class="me-1" style={{ color: "#2b2a2a" }}>123456789899</h8>
                  </div>
                  <div >
                    <Link to="/destination-route" className='me-2 flex-grow-1' style={linkStyle}>
                      <h9 style={{ color: "#1677ff" }}>Edit</h9>
                    </Link>
                    <Link to="/destination-route" className='me-2 flex-grow-1' style={linkStyle}>
                      <h9 style={{ color: "#1677ff" }}>Send Email</h9>
                    </Link>
                    <Link to="/destination-route" className='me-2 flex-grow-1' style={linkStyle}>
                      <h9 style={{ color: "#1677ff" }}>Invite to Portal</h9>
                    </Link>
                    <Link to="/destination-route" className='me-2 flex-grow-1' style={linkStyle}>
                      <h9 style={{ color: "#1677ff" }}>Delete</h9>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-bottom mt-1 pb-1 d-flex " onClick={()=>setAddress(!address)}>
          <h6 className='flex-grow-1'>Address</h6>
         { address?<DownOutlined />:<UpOutlined/>}
       </div>
       {address?
        <div>
          <p class="small text-muted mb-1">Billing Address</p>
          <div className='d-flex'>
            <p class="mb-0">No Billing Address - </p>
              <Link to="/destination-route" style={linkStyle}>
               <p style={{ color: "#1677ff" }}>Add New Address</p>
              </Link>
          </div>
          <p class="small text-muted mb-1">Shipping Address</p>
          <div className='d-flex'>
            <p class="mb-0">No Shipping Address - </p>
              <Link to="/destination-route" style={linkStyle}>
               <p style={{ color: "#1677ff" }}>Add New Address</p>
              </Link>
          </div>
         </div>:null}
         <div class="border-bottom mt-1 pb-1 d-flex " onClick={()=>setOtherDetails(!otherDetails)}>
          <h6 className='flex-grow-1'>Other Details</h6>
          {otherDetails?<DownOutlined />:<UpOutlined/>}
       </div>
        {otherDetails&&(
          <div>
            <MoreDetails title={'Customer Type'}  titleType={'Business'}/>
            <MoreDetails title={'Default Currency'}  titleType={'INR'}/>
            <div className='d-flex mt-2'>
              <p style={{width:'%'}}>Payment Terms</p>
              <p >Due on Receipt</p>
            </div>
            <div className='d-flex mt-2' >
                <p style={{width:'18%'}}>Portal Status</p>
                <div className='d-flex align-items-center' style={{ marginLeft: 15, borderWidth: 0.5, padding: 5, backgroundColor: '#eceff1',height:32 }}>
                <p className="rounded-circle bg-danger mt-3" style={{ width: '4px', height: '4px', marginRight:'2px'}} />
                  <p className='me-4 pt-3 text-danger'>Disabled</p>
                <SettingFilled />
                </div>
              </div>
              <MoreDetails title={'Portal Language'}  titleType={'English'}/>
          </div>
        )}
       <div class="border-bottom mt-1 pb-1 d-flex " onClick={()=>setContactUs(!contactUs)}>
          <h6 className='flex-grow-1'>CONTACT PERSONS</h6>
          <PlusCircleOutlined style={{ fontSize: '20px', color: '#1677ff',marginRight:'10px' }}/>
         {contactUs?<DownOutlined />:<UpOutlined/>}
       </div>
       {contactUs&&(
         <div>
          <h6 className='mt-3 text-center'>No contact persons found.</h6>
           <div className='container justify-content-center align-items-center' style={{ width: '350px', height: '150px',backgroundColor:'#f6f9e9',paddingTop:"10px"}}>
           <div className='d-flex mt-2'>
             <img src={userIcon} alt="User Icon" style={{width:'40px',height:'40px',marginRight:'5px'}}/>
             <p className='text-justify'>
              Customer Portal allows your customers to keep track of all the transactions between them and your business.<Button type='link'>Learn More</Button>
             </p>
           </div>
           <div  style={{paddingLeft:'35px' }}>
           <Button>Enable Portal</Button>
           </div>
           </div>
         </div>
         )}
         <div class="border-bottom mt-1 pb-1 d-flex " onClick={()=>setRecordInfo(!recordInfo)}>
          <h6 className='flex-grow-1'>ORECORD INFO</h6>
          {recordInfo?<DownOutlined />:<UpOutlined/>}
       </div>
        {recordInfo&&(<>
          <div className='mt-2'>
             <h7 className='me-3' style={{color:'#b1b1b1'}}>Customer ID</h7>
             <h7 style={{color:'#000'}}>1367875000000017123</h7>
          </div>
          <div>
             <h7 className='me-4' style={{color:'#b1b1b1'}}>Created on</h7>
             <h7 style={{color:'#000'}}>26/06/2023</h7>
          </div>
          <div>
             <h7 className='me-4' style={{color:'#b1b1b1'}}>Created By</h7>
             <h7 style={{color:'#000'}}>Test User</h7>
          </div>
        </>)}
      </div>
      <div className='col'>
         <div className='mt-3 ml-4'>
          <h6 style={{color:'#b1b1b1'}}>Payment due</h6>
          <h6 style={{color:'#b1b1b1'}}>period</h6>
          <h6 style={{color:'#000'}}>Due on Receipt</h6>
          <h4 className='mt-4' style={{color:'#000'}}>Receivables</h4>
          <div className='border-top,border-bottom d-flex justify-content-between bg-secondary p-2'>
             <h7>CURRENCY</h7>
             <h7>OUTSTANDING RECEIVABLES</h7>
             <h7>UNUSED CREDITS</h7>
          </div>
          <div className='border-top,border-bottom d-flex justify-content-between bg-light p-2 border-secondary'>
             <h7>INR- Indian Rupee</h7>
             <h7>Rs.0.00</h7>
             <h7>Rs.0.00</h7>
          </div>
          <Link to="/destination-route" style={linkStyle} className='mt-4 text-secondary'>
          <div className='border-top,border-bottom d-flex bg-light p-2 border-secondary mt-4'>
             <h7>Items to be packed:</h7>
             <h7 className='me-2 text-danger'> 3.00</h7>
             <div className='border border-secondary me-2 ' style={{width:'0.5px'}}/>
             <h7>Items to be shipped: </h7>
             <h7 className='text-danger'> 3.00</h7>
          </div>
          </Link>
          {data?.map((items,i)=>
          <div key={i} className={i===0?'d-flex mt-5':'d-flex'}>
          <h9 style={{width:'150px',marginTop:'34px'}}>{items.date}</h9>
          <div className='border border-secondary' style={{width:'0.5px',height:'110px'}}/>
          <div className="border border-1 rounded-circle p-1 d-flex justify-content-center mt-4" style={{width:'25px',height:'25px',marginLeft:'-12px',background:'#F6FBFF'}} ><MessageOutlined  /></div>
            <div className="container chat-container " style={{marginLeft:'15px'}}>
              <div className="row">
                <div className="col-md-12 offset chat-box">
                 <div className="arrow-up"></div>
                    <h6 className="alert-heading">{items.title}</h6>
                    <p>{items.text}</p>
                </div>
              </div>
            </div>   
          </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
const linkStyle = {
  textDecoration: 'none',
};
