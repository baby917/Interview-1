'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import './home.css'

type FormData = {
  mobile: string
  code: string
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const mobileValue = watch('mobile')

  // 验证手机号格式
  const validateMobile = (value: string) => {
    if (!value) return '请输入手机号'
    const mobileRegex = /^1[3-9]\d{9}$/
    if (!mobileRegex.test(value)) return '手机号格式错误'
    return true
  }

  // 验证验证码格式
  const validateCode = (value: string) => {
    if (!value) return '请输入验证码'
    const codeRegex = /^\d{6}$/
    if (!codeRegex.test(value)) return '验证码格式错误'
    return true
  }

  // 提交表单
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // 模拟API请求
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-item">
        <input
          placeholder="手机号"
          {...register('mobile', {
            validate: validateMobile,
          })}
        />
        {errors.mobile && (
          <p className="form-error">{errors.mobile.message}</p>
        )}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            {...register('code', {
              validate: validateCode,
            })}
          />
          <button
            className="getcode"
            disabled={!isValid || !mobileValue}
            type="button"
          >
            获取验证码
          </button>
        </div>
        {errors.code && <p className="form-error">{errors.code.message}</p>}
      </div>

      <button className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'submiting......' : '登录'}
      </button>
    </form>
  )
}