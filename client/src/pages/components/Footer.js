import React from 'react'
import { Outlet } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <footer>
    <ul>
        <li>
            <a>Privacy and Security</a>
        </li>
        <li>
            <a>Terms and Conditions</a>
        </li>
        <li>
            <a>Sitemap</a>
        </li>
        <li>
            <a>Accessibility</a>
        </li>
    </ul>
    </footer>
    <Outlet />
</div>
  )
}

export default Footer