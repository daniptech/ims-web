import { Button, Image } from 'antd'
import React from 'react'
import { Images } from '../controller/Images'
import { useNavigate } from 'react-router-dom'
import { routes } from '../controller/routes'

const PageNoteFound = ({setSelectKey}) => {
    const navigate = useNavigate()
    return (
        <div className='w-100 d-flex justify-content-center' style={{
            minHeight: '100vh',
            maxHeight: '100vh'
        }}>
            <div>
                <Image src={Images.pagenotefoundimg} alt='' preview={false} />
                <div className='text-center '>
                    <Image src={Images.pagenotefoundtext} alt='' preview={false} />
                    <div className='mt-4'><Button type='primary' size='large' onClick={() => {
                        setSelectKey('home')
navigate(routes.home.dashboard)
                    }}>
                        <Image src={Images.gotohometext} width={100} alt='' preview={false} />
                        </Button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PageNoteFound
