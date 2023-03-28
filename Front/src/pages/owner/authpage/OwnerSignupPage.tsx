import styled from 'styled-components'
import { OwnerSignupAuthForm } from '../../../components/OwnerForm/OwnerAuthForm/OwnerAuthForm'

const OwnersignupPage = () => {
    return <OwnerSignupContainer><OwnerSignupAuthForm /></OwnerSignupContainer>
}

export default OwnersignupPage

const OwnerSignupContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`