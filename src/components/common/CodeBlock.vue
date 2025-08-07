<template>
  <div class="code-block-wrapper">
    <div class="code-header" v-if="title || language">
      <span v-if="title" class="code-title">{{ title }}</span>
      <span v-if="language" class="code-language">{{ language }}</span>
    </div>
    <pre class="code-block"><code>{{ code }}</code></pre>
    <button v-if="copyable" @click="copyCode" class="copy-btn">
      {{ copied ? '已复制' : '复制代码' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    copyable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      copied: false
    }
  },
  methods: {
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.code)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
  }
}
</script>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: 1rem 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2d3748;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px 6px 0 0;
  font-size: 0.9rem;
}

.code-title {
  font-weight: 600;
}

.code-language {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0 0 6px 6px;
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block-wrapper:not(.code-header) .code-block {
  border-radius: 6px;
}

.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.copy-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}
</style>