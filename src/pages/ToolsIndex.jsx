import React, { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

const TOOLS = [
  // Reconnaissance
  { name: "Nmap", url: "https://nmap.org", category: "Reconnaissance", description: "Network mapping and port scanning" },
  { name: "Shodan", url: "https://www.shodan.io", category: "Reconnaissance", description: "IoT and internet-facing device search engine" },
  { name: "theHarvester", url: "https://github.com/laramies/theHarvester", category: "Reconnaissance", description: "Email and subdomain OSINT" },
  { name: "Subfinder", url: "https://github.com/projectdiscovery/subfinder", category: "Reconnaissance", description: "Subdomain discovery tool" },
  { name: "HTTPX", url: "https://github.com/projectdiscovery/httpx", category: "Reconnaissance", description: "HTTP probe and web server enumeration" },
  { name: "Nuclei", url: "https://github.com/projectdiscovery/nuclei", category: "Reconnaissance", description: "Vulnerability scanning with templates" },
  { name: "Whatweb", url: "https://www.morningstarsecurity.com/research/whatweb", category: "Reconnaissance", description: "Web server fingerprinting" },
  { name: "Waybackurls", url: "https://github.com/tomnomnom/waybackurls", category: "Reconnaissance", description: "Wayback Machine URL enumeration" },
  { name: "FFuf", url: "https://github.com/ffuf/ffuf", category: "Reconnaissance", description: "Web fuzzing tool" },
  
  // Initial Access
  { name: "GoPhish", url: "https://github.com/gophish/gophish", category: "Initial Access", description: "Phishing campaign management" },
  { name: "SQLMap", url: "http://sqlmap.org", category: "Initial Access", description: "SQL injection testing and exploitation" },
  { name: "Log4Shell PoC", url: "https://github.com/projectdiscovery/nuclei-templates", category: "Initial Access", description: "Log4j RCE exploitation" },
  { name: "Marshalsec", url: "https://github.com/NickstaDB/SerializationDumper", category: "Initial Access", description: "Java deserialization exploit gadgets" },
  { name: "Ysoserial", url: "https://github.com/frohoff/ysoserial", category: "Initial Access", description: "Java deserialization payload generator" },
  { name: "Wafw00f", url: "https://github.com/EnableSecurity/wafw00f", category: "Initial Access", description: "WAF fingerprinting and detection" },
  
  // Discovery & Enumeration
  { name: "netexec (nxc)", url: "https://github.com/Pennyw0rth/netexec", category: "Discovery", description: "Multi-protocol post-exploitation tool" },
  { name: "BloodHound", url: "https://github.com/BloodHoundAD/BloodHound", category: "Discovery", description: "Active Directory visualization and analysis" },
  { name: "SharpHound", url: "https://github.com/BloodHoundAD/SharpHound", category: "Discovery", description: "BloodHound collector for Windows" },
  { name: "bloodhound-python", url: "https://github.com/dirkjanm/bloodhound.py", category: "Discovery", description: "BloodHound collector for Linux" },
  { name: "ldapsearch", url: "https://linux.die.net/man/1/ldapsearch", category: "Discovery", description: "LDAP directory query tool" },
  { name: "Windapsearch", url: "https://github.com/ropnop/windapsearch", category: "Discovery", description: "Active Directory LDAP enumeration" },
  { name: "Adidnsdump", url: "https://github.com/dirkjanm/adidnsdump", category: "Discovery", description: "ADIDNS record enumeration" },
  { name: "Enum4linux-ng", url: "https://github.com/cddmp/enum4linux-ng", category: "Discovery", description: "SMB share and user enumeration" },
  { name: "Smbclient", url: "https://linux.die.net/man/1/smbclient", category: "Discovery", description: "SMB client for share access" },
  { name: "Smbmap", url: "https://github.com/ShawnDEvans/smbmap", category: "Discovery", description: "SMB share enumeration and download" },
  { name: "Certify", url: "https://github.com/GhostPack/Certify", category: "Discovery", description: "ADCS vulnerability scanner" },
  { name: "Certipy", url: "https://github.com/ly4k/Certipy", category: "Discovery", description: "ADCS exploitation tool" },
  { name: "Ldeep", url: "https://github.com/franc-pentest/ldeep", category: "Discovery", description: "LDAP enumeration and query" },
  
  // Credential Access
  { name: "Mimikatz", url: "https://github.com/gentilkiwi/mimikatz", category: "Credential Access", description: "Windows credential extraction and manipulation" },
  { name: "Hashcat", url: "https://hashcat.net", category: "Credential Access", description: "GPU-accelerated password cracking" },
  { name: "Hydra", url: "https://github.com/vanhauser-thc/thc-hydra", category: "Credential Access", description: "Multi-protocol brute force tool" },
  { name: "Kerbrute", url: "https://github.com/ropnop/kerbrute", category: "Credential Access", description: "Kerberos username and password enumeration" },
  { name: "Rubeus", url: "https://github.com/GhostPack/Rubeus", category: "Credential Access", description: "Kerberos ticket manipulation" },
  { name: "Kerberoasting (Impacket)", url: "https://github.com/fortra/impacket", category: "Credential Access", description: "GetUserSPNs for Kerberoasting" },
  { name: "hashcat", url: "https://hashcat.net", category: "Credential Access", description: "NTLMv2 hash cracking" },
  { name: "Responder", url: "https://github.com/lgandx/Responder", category: "Credential Access", description: "LLMNR/NBT-NS poisoning" },
  { name: "Coercer", url: "https://github.com/p0dalirius/Coercer", category: "Credential Access", description: "Windows authentication coercion" },
  { name: "PetitPotam", url: "https://github.com/topotam/PetitPotam", category: "Credential Access", description: "MS-EFSRPC coercion" },
  { name: "GetNPUsers (Impacket)", url: "https://github.com/fortra/impacket", category: "Credential Access", description: "AS-REP roasting" },
  { name: "PrintNightmare", url: "https://github.com/cube0x0/CVE-2021-1675", category: "Credential Access", description: "Print Spooler RCE" },
  { name: "ZeroLogon", url: "https://github.com/dirkjanm/CVE-2020-1472", category: "Credential Access", description: "Netlogon privilege escalation" },
  { name: "Secretsdump (Impacket)", url: "https://github.com/fortra/impacket", category: "Credential Access", description: "Local and remote SAM/NTDS dumping" },
  { name: "LaZagne", url: "https://github.com/AlessandroZ/LaZagne", category: "Credential Access", description: "Credential extraction from browsers and applications" },
  { name: "Pypykatz", url: "https://github.com/skelsec/pypykatz", category: "Credential Access", description: "Mimikatz parser for offline analysis" },
  { name: "DPAPI-NG", url: "https://github.com/ly4k/Decrypt", category: "Credential Access", description: "DPAPI decryption utilities" },
  
  // Privilege Escalation
  { name: "UACMe", url: "https://github.com/hfiref0x/UACME", category: "Privilege Escalation", description: "UAC bypass techniques" },
  { name: "Potato exploits", url: "https://github.com/ohpe/juicy-potato", category: "Privilege Escalation", description: "Token impersonation privilege escalation" },
  { name: "LAPS-reader", url: "https://github.com/n00py/LAPSToolkit", category: "Privilege Escalation", description: "LAPS password extraction" },
  { name: "Dacledit", url: "https://github.com/rmondello/dacledit", category: "Privilege Escalation", description: "Active Directory ACL manipulation" },
  { name: "ADACLScanner", url: "https://github.com/canix1/ADACLScanner", category: "Privilege Escalation", description: "Active Directory ACL enumeration" },
  { name: "SharpGPOAbuse", url: "https://github.com/FSecureLABS/SharpGPOAbuse", category: "Privilege Escalation", description: "GPO abuse and exploitation" },
  { name: "GPOdity", url: "https://github.com/sensepost/gpoddity", category: "Privilege Escalation", description: "Group Policy enumeration" },
  { name: "Get-GPPPassword", url: "https://github.com/PowerShellMafia/PowerSploit", category: "Privilege Escalation", description: "Group Policy Preferences password extraction" },
  { name: "FindDelegation", url: "https://github.com/gremilkar/findDelegation", category: "Privilege Escalation", description: "Kerberos delegation enumeration" },
  { name: "Impacket (rbcd.py)", url: "https://github.com/fortra/impacket", category: "Privilege Escalation", description: "Resource-Based Constrained Delegation abuse" },
  
  // Lateral Movement
  { name: "PsExec (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "Remote command execution via SMB" },
  { name: "Evil-WinRM", url: "https://github.com/Hackplayers/evil-winrm", category: "Lateral Movement", description: "WinRM command shell" },
  { name: "Dcomexec (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "DCOM lateral movement" },
  { name: "WmiExec (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "WMI command execution" },
  { name: "SMBExec (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "Service-based lateral movement" },
  { name: "GetST (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "Service ticket acquisition" },
  { name: "GetTGT (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "Kerberos TGT acquisition" },
  { name: "ntlmrelayx (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "NTLM relay and exploitation" },
  { name: "Mitm6", url: "https://github.com/dirkjanm/mitm6", category: "Lateral Movement", description: "IPv6 DHCP spoofing for NTLM relay" },
  { name: "Ticketer (Impacket)", url: "https://github.com/fortra/impacket", category: "Lateral Movement", description: "Kerberos ticket forging" },
  { name: "RDP (FreeRDP)", url: "https://www.freerdp.com", category: "Lateral Movement", description: "Remote Desktop Protocol client" },
  { name: "SSH (OpenSSH)", url: "https://www.openssh.com", category: "Lateral Movement", description: "Secure Shell remote access" },
  { name: "Sshpass", url: "https://linux.die.net/man/1/sshpass", category: "Lateral Movement", description: "Non-interactive SSH password input" },
  { name: "Netcat", url: "https://en.wikipedia.org/wiki/Netcat", category: "Lateral Movement", description: "Network swiss army knife" },
  
  // Defense Evasion
  { name: "Invoke-Obfuscation", url: "https://github.com/danielbohannon/Invoke-Obfuscation", category: "Defense Evasion", description: "PowerShell obfuscation tool" },
  { name: "UPX", url: "https://upx.github.io", category: "Defense Evasion", description: "Executable packer" },
  { name: "Steghide", url: "http://steghide.sourceforge.net", category: "Defense Evasion", description: "Steganography tool" },
  { name: "Donut", url: "https://github.com/TheWover/donut", category: "Defense Evasion", description: ".NET to shellcode converter" },
  { name: "sRDI", url: "https://github.com/monoxgas/sRDI", category: "Defense Evasion", description: "Shellcode reflective DLL injection" },
  { name: "msfvenom", url: "https://www.metasploit.com", category: "Defense Evasion", description: "Payload and shellcode generator" },
  { name: "Dragonslayer", url: "https://github.com/eset/dragonslayer", category: "Defense Evasion", description: "WPA3 SAE attack tool" },
  { name: "Certutil", url: "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/certutil", category: "Defense Evasion", description: "Windows certificate utility (LOLBin)" },
  { name: "Regsvr32", url: "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/regsvr32", category: "Defense Evasion", description: "COM registration utility (LOLBin)" },
  { name: "Mshta", url: "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/mshta", category: "Defense Evasion", description: "HTML application host (LOLBin)" },
  { name: "Rundll32", url: "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/rundll32", category: "Defense Evasion", description: "DLL execution utility (LOLBin)" },
  
  // C2 & Exfiltration
  { name: "Cobalt Strike", url: "https://www.cobaltstrike.com", category: "C2", description: "Commercial C2 framework" },
  { name: "Metasploit", url: "https://www.metasploit.com", category: "C2", description: "Open-source penetration testing framework" },
  { name: "Empire", url: "https://github.com/EmpireProject/Empire", category: "C2", description: "PowerShell post-exploitation agent" },
  { name: "Sliver", url: "https://github.com/BishopFox/sliver", category: "C2", description: "Golang-based C2 framework" },
  { name: "Merlin", url: "https://github.com/Ne0nd0g/merlin", category: "C2", description: "Go-based C2 server and agent" },
  { name: "Mythic", url: "https://github.com/its-a-feature/Mythic", category: "C2", description: "Modular C2 framework" },
  { name: "Rclone", url: "https://rclone.org", category: "Exfiltration", description: "Cloud storage sync and exfiltration" },
  { name: "Curl", url: "https://curl.se", category: "Exfiltration", description: "Data transfer via HTTP/HTTPS" },
  { name: "Wget", url: "https://www.gnu.org/software/wget", category: "Exfiltration", description: "File download and transfer" },
  { name: "Rsync", url: "https://rsync.samba.org", category: "Exfiltration", description: "File synchronization and transfer" },
  
  // Collection & Analysis
  { name: "Tshark", url: "https://www.wireshark.org/docs/man-pages/tshark.html", category: "Collection", description: "Network packet analysis" },
  { name: "Tcpdump", url: "https://www.tcpdump.org", category: "Collection", description: "Network packet capture" },
  { name: "Sox", url: "http://sox.sourceforge.net", category: "Collection", description: "Audio processing tool" },
  { name: "Ffmpeg", url: "https://ffmpeg.org", category: "Collection", description: "Audio/video processing" },
  { name: "Readpst", url: "https://linux.die.net/man/1/readpst", category: "Collection", description: "PST file parser" },
  { name: "Hostapd-wpe", url: "https://github.com/OpenSecurityResearch/hostapd-wpe", category: "Collection", description: "Evil twin with RADIUS credential capture" },
  { name: "Bettercap", url: "https://www.bettercap.org", category: "Collection", description: "Network attack and monitoring framework" },
  { name: "Airmon-ng", url: "https://linux.die.net/man/1/airmon-ng", category: "Collection", description: "Wireless adapter mode switching" },
  { name: "Airodump-ng", url: "https://linux.die.net/man/1/airodump-ng", category: "Collection", description: "Wireless network discovery" },
  { name: "Aireplay-ng", url: "https://linux.die.net/man/1/aireplay-ng", category: "Collection", description: "Wireless packet injection" },
  { name: "Aircrack-ng", url: "https://www.aircrack-ng.org", category: "Collection", description: "WPA/WPA2 password cracking" },
  { name: "Hashcat", url: "https://hashcat.net", category: "Collection", description: "PMKID and WPA2 cracking" },
  { name: "Hcxdumptool", url: "https://github.com/ZerBea/hcxdumptool", category: "Collection", description: "PMKID capture tool" },
  { name: "Hcxpcapngtool", url: "https://github.com/ZerBea/hcxtools", category: "Collection", description: "Hash conversion for WPA cracking" },
  { name: "Wifiphisher", url: "https://github.com/wifiphisher/wifiphisher", category: "Collection", description: "Automated evil twin and phishing" },
  { name: "Mdk4", url: "https://github.com/aircrack-ng/mdk4", category: "Collection", description: "Deauthentication and attack tool" },
  { name: "Reaver", url: "https://github.com/t6x/reaver-wps", category: "Collection", description: "WPS PIN cracking" },
  { name: "Wash", url: "https://github.com/t6x/reaver-wps", category: "Collection", description: "WPS device discovery" },
  
  // Post-Exploitation
  { name: "Roadrecon", url: "https://github.com/dirkjanm/roadrecon", category: "Post-Exploitation", description: "Azure AD enumeration via Microsoft Graph" },
  { name: "Roadtx", url: "https://github.com/dirkjanm/roadtx", category: "Post-Exploitation", description: "Azure AD token manipulation" },
  { name: "SharpHound-Python", url: "https://github.com/dirkjanm/bloodhound.py", category: "Post-Exploitation", description: "BloodHound data collection" },
  { name: "Sharphound", url: "https://github.com/BloodHoundAD/SharpHound", category: "Post-Exploitation", description: "Windows BloodHound collector" },
  { name: "MailSniper", url: "https://github.com/dafthack/MailSniper", category: "Post-Exploitation", description: "Exchange mailbox search and dump" },
  { name: "PrivExchange", url: "https://github.com/dirkjanm/privexchange", category: "Post-Exploitation", description: "Exchange privilege escalation" },
];

export default function ToolsIndex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(TOOLS.map(t => t.category))].sort();

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(222,47%,6%)] to-[hsl(222,47%,8%)] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Red Team Tools Index</h1>
          <p className="text-slate-400">Complete reference of offensive security tools and techniques</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-700 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-lg border border-slate-700 bg-slate-900/30 hover:bg-slate-800/50 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {tool.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
                </div>
                <p className="text-slate-400 text-sm mb-2">{tool.description}</p>
                <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                  {tool.category}
                </span>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">No tools found matching your search.</p>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Showing {filteredTools.length} of {TOOLS.length} tools
          </p>
        </div>
      </div>
    </div>
  );
}