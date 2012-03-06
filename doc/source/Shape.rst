キャンバス
==========

キャンバスクラス
----------------

.. js:class:: Drawable(node, width, height)

   :param HTMLDivElement node: ターゲットノード
   :param Double width:     キャンバスの幅
   :param Double height:    キャンバスの高さ

   キャンバスのクラスです。
   (width,height)で大きさを定義すると、その大きさのキャンバスが作られます。

   .. method:: anchor([anchor])

      :param PointObject|AnchorString anchor: キャンバス内のオブジェクトの基準点 (オプション)
      :return: キャンバス内のオブジェクトのデフォルトの基準点 (PointObject)

      キャンバス内のオブジェクトのデフォルトの基準点を設定／取得します。

   .. method:: gensym()

      :return: キャンバスの中のオブジェクトの新しいユニークID <String>

      キャンバス中でユニークな新しいIDを返します。

   .. method:: circle(x, y, width, height)

      :param Double x: 円のキャンバスでの座標x
      :param Double y: 円のキャンバスでの座標y
      :param Double width: 円のx軸の直径
      :param Double height: 円のy軸の直径
      :return: 円ノード <:js:class:`Circle`>

      キャンバスの指定された位置(x,y)に円を描き、そのオブジェクトを返します。

   .. method:: rect(x, y, width, height)

      :param Double x: 四角形のキャンバスでの座標x
      :param Double y: 四角形のキャンバスでの座標y
      :param Double width: 四角形の幅
      :param Double height: 四角形の高さ
      :return: 四角形ノード <:js:class:`Rect`>

      キャンバスの指定された位置(x,y)に四角形を描き、そのオブジェクトを返します。

   .. method:: path(points)

      :param PointsArray points: ポイントの座標配列
      :return: パスノード <:js:class:`Path`>

      キャンバスに指定されたパスを描き、そのオブジェクトを返します。


形状クラス
==========

円クラス
--------

.. js:class:: Circle(id, x, y, width, height)

   :param String id: id属性
   :param Double x: x座標
   :param Double y: y座標
   :param Double width: x軸の直径
   :param Double height: y軸の直径
   :インターフェース: :js:class:`Shape`

   円オブジェクト

四角形クラス
------------

.. js:class:: Rect(id, x, y, width, height)

   :param String id: id属性
   :param Double x: x座標
   :param Double y: y座標
   :param Double width: 長方形の横幅
   :param Double height: 長方形の高さ
   :インターフェース: :js:class:`Shape`

   四角形オブジェクト


パスクラス
----------------

.. js:class:: Path(id, points)

   :param String id: id属性
   :param PointsArray points: ポイント
   :インターフェース: :js:class:`Shape`

   パスオブジェクト


形状の実装インターフェース
--------------------------

.. js:class:: Shape()

   シェイプを実装するためのインターフェースです。

   .. method:: position([d])

      :param PositionObject d: ポジション情報 (オプション)
      :return: ポジション情報 (PositionObject)

      シェイプのポジション情報を取得／設定します。

   .. method:: size([d])

      :param SizeObject d: サイズ情報 (オプション)
      :return: サイズ情報 (SizeObject)

      シェイプのサイズ情報を取得／設定します。

   .. method:: display_position()

      :return: ディスプレイ上でのポジション情報 (PositionObject)

      シェイプのディスプレイ上でのポジション情報を取得します。

   .. method:: display_size()

      :return: ディスプレイ上でのサイズ情報 (SizeObject)

      シェイプのディスプレイ上でのサイズ情報を取得します。

   .. method:: transform([d])

      :param TransformObject d: シェイプに適用するトランスフォーム情報
      :return: 適用されているトランスフォーム情報

      シェイプのトランスフォーム情報を取得／設定します。

   .. method:: style([d])

      :arg Double d: 設定したい新しいスタイル属性（オプション）
      :return: 現在のスタイル属性

      シェイプのスタイルを取得／設定します。
