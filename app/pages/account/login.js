'use strict'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Button from 'react-native-button'
import request from '../../common/request'
import config from '../../common/config'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native'

const {width} = Dimensions.get('window')

export default class Login extends Component<Props> {
  constructor (props) {
    super(props)

    this.state = {
      pop: null,
      verifyCode: '',
      phoneNumber: '',
      countingDone: false,
      codeSent: false,
      codeNumer: 60
    }
  }

  _showVerifyCode () {
    this.setState({
      codeSent: true
    })
  }

  _countingDone () {
    this.setState({
      countingDone: true
    })
  }
  _countingFalae () {
    this.setState({
      countingDone: false
    })
  }
  _sendVerifyCode () {
    let that = this
    const phoneNumber = this.state.phoneNumber

    if (!phoneNumber) {
      return that.props.popAlert('呜呜~', '手机号不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber
    }

    const signupURL = config.api.signup
     request.post(signupURL, body)
      .then((data) => {
        if (data && data.success) {
          this.setState({
            verifyCode: data.verifyCode
          })
          that._showVerifyCode()
           this._countingFalae()
           this.interval = setInterval(() => {
             let timer = this.state.codeNumer
             if (this.state.codeNumer === 0) {
               clearInterval(this.interval)
               this._countingDone()
                this.setState({
                    codeNumer: 60
                })
             } else {
               this.setState({
                codeNumer: --timer
               })
             }
           }, 1000)
        } else {
          that.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
        }
      })
      .catch((err) => {
        that.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
      })
  }

  _submit () {
    let that = this
    const phoneNumber = this.state.phoneNumber
    const verifyCode = this.state.verifyCode

    if (!phoneNumber || !verifyCode) {
      return that.props.popAlert('呜呜~', '手机号或验证码不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    }

    const verifyURL = config.api.verify

    request.post(verifyURL, body)
      .then((data) => {
        if (data && data.success) {
          that.props.afterLogin(data.data)
        } else {
          that.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
        }
      })
      .catch((err) => {
        that.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
      })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder='输入手机号'
            autoCaptialize={'none'}
            autoCorrect={false}
            keyboardType={'number-pad'}
            style={styles.inputField}
            underlineColorAndroid='transparent'
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text
              })
            }}
          />

          {
            this.state.codeSent
            ? <View style={styles.verifyCodeBox}>
              <TextInput
                placeholder='输入验证码'
                underlineColorAndroid='transparent'
                autoCaptialize={'none'}
                autoCorrect={false}
                keyboardType={'number-pad'}
                value={this.state.verifyCode}
                style={[styles.inputField, styles.verifyField]}
                onChangeText={(text) => {
                  this.setState({
                    verifyCode: text
                  })
                }}
                />

              {
                  this.state.countingDone
                  ? <Button
                    style={styles.countBtn}
                    onPress={this._sendVerifyCode.bind(this)}>获取验证码</Button>
                  : <Button style={styles.countBtn}>已发送{this.state.codeNumer}秒</Button>

                }
            </View>
            : null
          }

          {
            this.state.codeSent
            ? <Button
              style={styles.btn}
              onPress={this._submit.bind(this)}>登录</Button>
            : <Button
              style={styles.btn}
              onPress={this._sendVerifyCode.bind(this)}>获取验证码</Button>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },

  signupBox: {
    marginTop: 30
  },

  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },

  inputField: {
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4
  },

  verifyField: {
    width: width - 140
  },

  verifyCodeBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  countBtn: {
    width: 110,
    height: 40,
    padding: 10,
    marginLeft: 8,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    color: '#fff',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 2
  },

  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee735c',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        borderRadius: 4,
      },
      android: {
        borderRadius: 0
      }
    }),
    color: '#ee735c'
  }
})
