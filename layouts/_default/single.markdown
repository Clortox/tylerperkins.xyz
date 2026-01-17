---
title: "{{ .Title }}"
date: {{ .Date.Format "2006-01-02" }}
{{ if .Draft }}draft: true{{ end }}
---

{{ .RawContent }}