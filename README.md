# CPM Leak Package – H.I.B.G.

This repo contains files extracted from **CPM Yazılım** (cpm.com.tr) infrastructure. The summary below explains what each directory holds and highlights critical points from `/inetpub/wwwroot/web.config`.

---

## 1. Directory structure

* `cpm_requests.jsonl` – raw JSON lines with support tickets.
* `cpmcompanyfiles/` – corporate documents such as contracts, invoices, presentations.
* `downloads/` – media files served on the support page (images, PDF, ZIP).
* `/inetpub/wwwroot/web.config` – IIS + .NET + PHP configuration with multiple FastCGI versions and handler list.

*Note: Original names are preserved; nothing was renamed or edited.*

---

## 2. web.config technical notes

* RCE potential.
* ASP Classic and .NET Framework 2.0/4.0 pipelines enabled; wide attack surface.
* WebDAV, TRACE and OPTIONS allowed; risk of info leak or file write.
* Extensionless URL handler routes everything to .NET 4.0; LFI / privilege‑escalation combos possible.
* `*.exe` and `*.dll` can be executed through CGI or ISAPI; dangerous if a malicious binary is uploaded.

The full handler list remains in the original file.

---

## 3. Quick commands

```bash
# View ticket dump line by line
jq -r '.subject + " | " + .created_at' cpm_requests.jsonl | less -R

# Mirror support media locally
rsync -av downloads/ ./local_downloads/
```

---

## 4. SEO / search keywords (20)

```
cpm
cpm erp
cpm.com.tr
cpm leak
cpm veri sizintisi
cpm master erp
cpm yazilim hack
cpm destek panel dump
cpmcompanyfiles
cpm_requests.jsonl
cpm web.config exposed
cpm fastcgi vulnerability
cpm php 5.3 end of life
cpm iis misconfiguration
cpm erp breach
cpm ticket leak
cpm dokuman arsivi
cpm destek medya indir
cpm source disclosure
cpm rce exploit
```

---

## 5. Version & contact

Last updated: 29 May 2025
Open an issue or PR with the tag "H.I.B.G." if you have questions.
