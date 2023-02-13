import React from "react"
import styles from './Auth.module.scss'
import {Button, Form, Input} from "antd";
import textData from "../../languages/en.json"
import { useNavigate } from "react-router-dom";

interface IAuthProps {
    updateUser: (username: string | null) => void
}

const Auth = (props: IAuthProps) => {

    const {updateUser} = props
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        navigate("/home")
        updateUser(values.username)
    };

    return (
        <div className={styles.auth_wrapper}>

            <div className={styles.auth_description}>{textData.auth.description}</div>
            <Form
                className={styles.auth_form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    className={styles.auth_form_label}
                    name="username"
                    rules={[{ required: true, message: textData.auth.validationMessage }]}
                >
                    <Input
                        className={styles.auth_form_input}
                        placeholder={textData.auth.userNamePlaceholder}
                    />
                </Form.Item>

                <Form.Item className={styles.auth_wrapper_submitBtn}>
                    <Button
                        className={styles.auth_submitBtn}
                        htmlType="submit"
                    >
                        {textData.auth.submit}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Auth