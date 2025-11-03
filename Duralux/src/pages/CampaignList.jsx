import CampaignsTable from '@/components/campaign/CampaignsTable'
import React from 'react'

const CampaignList = () => {
  return (
    <div className="main-content">
        <div className="row">
          <CampaignsTable />
        </div>
      </div>
  )
}

export default CampaignList