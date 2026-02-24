import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  isExpanded = false;

    toggleGallery() {
      this.isExpanded = !this.isExpanded;
    }


  images: string[] = [
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536789/DSC_0121.JPG_o7hzja.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536790/DSC_0353.JPG_xvbrl1.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536789/DSC_0154.JPG_hjqfun.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536343/WhatsApp_Image_2025-11-29_at_3.37.37_PM_y7k2tx.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536344/WhatsApp_Image_2025-11-29_at_3.46.27_PM_yonzes.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536344/WhatsApp_Image_2025-11-29_at_3.45.23_PM_b1bgvc.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536343/WhatsApp_Image_2025-11-29_at_3.37.55_PM_qblpmj.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536343/WhatsApp_Image_2025-11-29_at_3.46.29_PM_1_v2qm3i.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536342/WhatsApp_Image_2025-11-29_at_3.37.58_PM_difb4c.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536343/WhatsApp_Image_2025-11-29_at_3.46.28_PM_grcqeh.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536342/WhatsApp_Image_2025-11-29_at_3.37.35_PM_h0zgcy.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536341/WhatsApp_Image_2025-11-29_at_3.46.30_PM_1_kxmcux.jpg',
    'https://res.cloudinary.com/doawbwzbs/image/upload/v1764536341/WhatsApp_Image_2025-11-29_at_3.46.30_PM_zd2p1v.jpg'
  ];

}
