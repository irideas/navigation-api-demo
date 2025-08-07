<template>
  <section class="section">
    <h2 class="section-title">表单导航拦截</h2>
    <div class="form-demo">
      <div class="demo-description">
        <p>演示如何拦截用户在填写表单时的导航行为，防止数据丢失。</p>
      </div>
      
      <form @input="handleFormInput" class="demo-form">
        <div class="form-group">
          <label>用户名：</label>
          <input v-model="formData.username" type="text" placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label>邮箱：</label>
          <input v-model="formData.email" type="email" placeholder="请输入邮箱">
        </div>
        <div class="form-group">
          <label>描述：</label>
          <textarea v-model="formData.description" placeholder="请输入描述"></textarea>
        </div>
        <div class="form-actions">
          <button type="button" @click="saveForm" class="btn btn-success">保存</button>
          <button type="button" @click="clearForm" class="btn btn-secondary">清空</button>
        </div>
      </form>
      
      <div class="form-status">
        <p>表单状态：{{ formDirty ? '已修改' : '未修改' }}</p>
        <p>导航拦截：{{ navigationBlocked ? '已启用' : '已禁用' }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { formInterceptionUtils } from '../utils/formInterceptionUtils.js'

export default {
  name: 'FormNavigationInterception',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        description: ''
      },
      formDirty: false,
      navigationBlocked: false
    }
  },
  mounted() {
    formInterceptionUtils.setupNavigationInterception()
  },
  beforeUnmount() {
    formInterceptionUtils.cleanupNavigationInterception()
  },
  methods: {
    handleFormInput() {
      this.formDirty = true
      this.enableNavigationBlocking()
    },
    
    saveForm() {
      setTimeout(() => {
        this.formDirty = false
        this.disableNavigationBlocking()
        alert('表单已保存')
      }, 500)
    },
    
    clearForm() {
      this.formData = {
        username: '',
        email: '',
        description: ''
      }
      this.formDirty = false
      this.disableNavigationBlocking()
    },
    
    enableNavigationBlocking() {
      if (this.navigationBlocked) return
      
      this.navigationBlocked = true
      formInterceptionUtils.enableBlocking(() => this.formDirty)
    },
    
    disableNavigationBlocking() {
      this.navigationBlocked = false
      formInterceptionUtils.disableBlocking()
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: #fff;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.demo-description {
  margin-bottom: 20px;
  color: #555;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #667eea;
}

.demo-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-success { background-color: #28a745; color: white; }
.btn-secondary { background-color: #6c757d; color: white; }

.btn:hover { opacity: 0.8; }

.form-status {
  background: #e9ecef;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #28a745;
}

.form-status p {
  margin: 5px 0;
  color: #2c3e50;
}
</style>