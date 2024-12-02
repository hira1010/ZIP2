import { AuctionItem } from '../types';
import JSZip from 'jszip';
import { CSV_HEADERS } from './csvHeaders';
import { stripHtml, formatCSVCell } from './csvFormatter';
import { generateTitle } from './titleGenerator';

function generateItemRows(item: AuctionItem): string[][] {
  // If no images, return empty array
  if (item.images.length === 0) {
    return [];
  }

  // Create rows for each image
  return item.images.map((image, index) => {
    const baseName = image.name.split(' (')[0];
    const title = generateTitle(baseName, index);
    const row = Array(CSV_HEADERS.length).fill('');

    const rowData = {
      'カテゴリ': item.category,
      'タイトル': title,
      '説明': stripHtml(item.description).slice(0, 25000),
      '開始価格': item.startPrice,
      '即決価格': item.buyNowPrice,
      '個数': item.quantity.toString(),
      '開催期間': item.auctionDuration.toString(),
      '終了時間': item.endTime.toString(),
      '画像1': '1',
      '画像1コメント': baseName,
      '商品発送元の都道府県': item.shippingFrom,
      '商品発送元の市区町村': '',
      '送料負担': item.shippingPayer,
      '代金支払い': '先払い',
      'Yahoo!かんたん決済': 'はい',
      'かんたん取引': 'はい',
      '商品代引': 'いいえ',
      '商品の状態': item.condition,
      '返品の可否': '返品不可',
      '入札者評価制限': 'はい',
      '悪い評価の割合での制限': 'はい',
      '入札者認証制限': 'いいえ',
      '自動延長': item.autoExtend ? 'はい' : 'いいえ',
      '早期終了': item.earlyTermination ? 'はい' : 'いいえ',
      '値下げ交渉': 'いいえ',
      '自動再出品': item.autoRelist.toString(),
      '注目のオークション': item.featuredCategory,
      'おすすめコレクション': '',
      'ネコポス': 'いいえ',
      'ネコ宅急便コンパクト': 'いいえ',
      'ネコ宅急便': 'いいえ',
      'ゆうパケット': 'はい',
      'ゆうパック': 'いいえ',
      'ゆうパケットポストmini': 'いいえ',
      'ゆうパケットプラス': 'いいえ',
      '発送までの日数': item.shippingDuration,
      '受け取り後決済サービス': 'いいえ',
      '海外発送': 'いいえ'
    };

    // Map the data to the correct positions
    CSV_HEADERS.forEach((header, index) => {
      if (header in rowData) {
        row[index] = rowData[header as keyof typeof rowData];
      }
    });

    return row;
  });
}

// Rest of the file remains unchanged...